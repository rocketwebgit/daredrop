import { head, not, gt, length, map, filter, propEq, prop, and } from 'ramda'
import { extension, lookup } from 'mime-types'
import uuid from 'uuid/v4'

import { getPayloadLenses } from 'root/src/server/api/getEndpointDesc'
import { DELIVERY_DARE_INIT } from 'root/src/shared/descriptions/endpoints/endpointIds'
import { TABLE_NAME, documentClient } from 'root/src/server/api/dynamoClient'
import s3 from 'root/src/server/api/s3Client'
import { videoBucket } from 'root/cfOutput'
import { PARTITION_KEY, SORT_KEY } from 'root/src/shared/constants/apiDynamoIndexes'
import { projectDeliveryPendingKey } from 'root/src/server/api/lenses'
import getTimestamp from 'root/src/shared/util/getTimestamp'
import { s3BaseURL } from 'root/src/shared/constants/s3Constants'
import dynamoQueryProject from 'root/src/server/api/actionUtil/dynamoQueryProject'
import dynamoQueryOAuth from 'root/src/server/api/actionUtil/dynamoQueryOAuth'
import userTokensInProjectSelector from 'root/src/server/api/actionUtil/userTokensInProjectSelector'
import { authorizationError, actionForbiddenError } from 'root/src/server/api/errors'
import generateUniqueSortKey from 'root/src/server/api/actionUtil/generateUniqueSortKey'
import dynamoQueryProjectDeliveries from 'root/src/server/api/actionUtil/dynamoQueryProjectDeliveries'

const payloadLenses = getPayloadLenses(DELIVERY_DARE_INIT)

const { viewVideoURL, viewTimeStamp, viewVideoName, viewProjectId } = payloadLenses

export default async ({ payload, userId }) => {
	const userTokens = await dynamoQueryOAuth(userId)
	const videoName = viewVideoName(payload)
	const videoURL = viewVideoURL(payload)
	const projectId = viewProjectId(payload)
	const timeStamp = viewTimeStamp(payload)

	// verifications
	const projectDeliveries = await dynamoQueryProjectDeliveries(projectId)
	const filterByUploader = filter(propEq('uploader', userId))
	const filterUploadedByUploader = filter(and(propEq('uploader', userId), propEq('s3Uploaded', true)))
	const userDeliveries = filterByUploader(projectDeliveries)
	let deliverySortKey

	if (gt(length(userDeliveries), 0)) {
		const uploadedUserDeliveries = filterUploadedByUploader(projectDeliveries)
		if (gt(length(uploadedUserDeliveries), 0)) {
			throw actionForbiddenError('User has already submitted video for this dare')
		}
		deliverySortKey = prop('sk', head(userDeliveries))
	}

	const [project] = head(await dynamoQueryProject(null, projectId))
	const userTokensInProject = userTokensInProjectSelector(userTokens, project)
	if (not(gt(length(userTokensInProject), 0))) {
		throw authorizationError('Assignee is not listed on this dare')
	}

	// action
	const fileName = `${uuid()}.${extension(lookup(videoName))}`

	const params = {
		Bucket: videoBucket,
		Key: fileName,
		Expires: 3600,
	}
	const url = s3.getSignedUrl('putObject', params)

	if (!deliverySortKey) {
		deliverySortKey = await generateUniqueSortKey(projectId, `project|${projectDeliveryPendingKey}|`, 1, 10)
	}

	const dareDeliveryObject = {
		[PARTITION_KEY]: projectId,
		[SORT_KEY]: deliverySortKey,
		videoURL,
		timeStamp,
		fileName,
		created: getTimestamp(),
		s3ObjectURL: `${s3BaseURL}${videoBucket}/${fileName}`,
		s3Uploaded: false,
		uploader: userId,
	}

	const deliveryParams = {
		TableName: TABLE_NAME,
		Item: dareDeliveryObject,
	}

	await documentClient.put(deliveryParams).promise()
	return { url, deliverySortKey }
}