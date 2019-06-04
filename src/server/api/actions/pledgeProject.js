import { head, add, prop, compose, map, not, length, gt, assoc, assocPath, append } from 'ramda'

import { TABLE_NAME, documentClient } from 'root/src/server/api/dynamoClient'

import { PARTITION_KEY, SORT_KEY, GSI1_INDEX_NAME, GSI1_PARTITION_KEY } from 'root/src/shared/constants/apiDynamoIndexes'

import sendEmail from 'root/src/server/email/actions/sendEmail'
import pledgeMadeMail from 'root/src/server/email/templates/pledgeMade'
import { pledgeMadeTitle } from 'root/src/server/email/util/emailTitles'
import projectHrefBuilder from 'root/src/server/api/actionUtil/projectHrefBuilder'

import { PLEDGE_PROJECT } from 'root/src/shared/descriptions/endpoints/endpointIds'
import { getPayloadLenses } from 'root/src/server/api/getEndpointDesc'
import pledgeDynamoObj from 'root/src/server/api/actionUtil/pledgeDynamoObj'
import dynamoQueryProject from 'root/src/server/api/actionUtil/dynamoQueryProject'
import projectSerializer from 'root/src/server/api/serializers/projectSerializer'
import getUserEmail from 'root/src/server/api/actionUtil/getUserEmail'
import validateStripeSourceId from 'root/src/server/api/actionUtil/validateStripeSourceId'
import generateUniqueSortKey from 'root/src/server/api/actionUtil/generateUniqueSortKey'
import validateStripeAuthorize from 'root/src/server/api/actionUtil/validateStripeAuthorize'
import { dynamoItemsProp } from 'root/src/server/api/lenses'
import { payloadSchemaError, authorizationError, generalError } from 'root/src/server/api/errors'

const payloadLenses = getPayloadLenses(PLEDGE_PROJECT)
const { viewPledgeAmount, viewPaymentInfo } = payloadLenses

export default async ({ userId, payload }) => {
	const { projectId } = payload
	const [
		projectToPledgeDdb, assigneesDdb,
	] = await dynamoQueryProject(
		userId, projectId,
	)

	const projectToPledge = head(projectToPledgeDdb)
	if (!projectToPledge) {
		throw generalError('Project doesn\'t exist')
	}

	const newPledgeAmount = viewPledgeAmount(payload)
	const paymentInfo = viewPaymentInfo(payload)
  let captureCharge
	if (paymentInfo.paymentType === 'stripeCard') {
    const validationCardId = await validateStripeSourceId(paymentInfo.paymentId)
    if (!validationCardId)
  		throw payloadSchemaError({ stripeCardId: 'Invalid source id' })
    captureCharge = await validateStripeAuthorize(newPledgeAmount, paymentInfo.paymentId)
    if (!captureCharge.authorized)
      throw payloadSchemaError(captureCharge.error)
	}

	let myPledge = head(dynamoItemsProp(await documentClient.query({
		TableName: TABLE_NAME,
		KeyConditionExpression: `${PARTITION_KEY} = :pk and ${SORT_KEY} = :pledgeUserId`,
		ExpressionAttributeValues: {
			':pk': projectId,
			':pledgeUserId': `pledge|${userId}`,
		},
		ConsistentRead: true,
	}).promise()))

	const addPledgers = myPledge ? 0 : 1

	if (not(myPledge)) {
		myPledge = pledgeDynamoObj(
			projectId, projectToPledge, userId,
		)
	}

	const newMyPledge = assoc('paymentInfo', append(paymentInfo, prop('paymentInfo', myPledge)), myPledge)
	const updatedPledgeAmount = assoc('pledgeAmount', add(newPledgeAmount, prop('pledgeAmount', myPledge)), newMyPledge)

	const { pledgeAmount } = projectToPledge

	const pledgeParams = {
		TableName: TABLE_NAME,
		Item: updatedPledgeAmount,
	}

	await documentClient.put(pledgeParams).promise()

	const updateProjectParams = {
		TableName: TABLE_NAME,
		Key: {
			[PARTITION_KEY]: projectToPledge[PARTITION_KEY],
			[SORT_KEY]: projectToPledge[SORT_KEY],
		},
		UpdateExpression: 'SET pledgeAmount = :newPledgeAmount, pledgers = pledgers + :newPledgers',
		ExpressionAttributeValues: {
			':newPledgeAmount': pledgeAmount + newPledgeAmount,
			':newPledgers': addPledgers,
		},
	}

	await documentClient.update(updateProjectParams).promise()

	const newProject = projectSerializer([
		...projectToPledgeDdb,
		...assigneesDdb,
		myPledge,
	])

	try {
		const email = await getUserEmail(userId)

		const emailData = {
			title: pledgeMadeTitle,
			dareTitle: prop('title', newProject),
			recipients: [email],
			// TODO EMAIL
			// expiry time in seconds
			dareHref: projectHrefBuilder(prop('id', newProject)),
			streamers: compose(map(prop('username')), prop('assignees'))(newProject),
			// TODO EMAIL
			// notClaimedAlready
		}

		sendEmail(emailData, pledgeMadeMail)
	} catch (err) { }


	return {
		...newProject,
		userId,
		pledgeAmount: add(
			viewPledgeAmount(projectToPledge),
			newPledgeAmount,
		),
		myPledge: newPledgeAmount,
		pledgers: add(newProject.pledgers, addPledgers),
	}
}
