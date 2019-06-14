import { TABLE_NAME, documentClient } from 'root/src/server/api/dynamoClient'
import { PARTITION_KEY, SORT_KEY } from 'root/src/shared/constants/apiDynamoIndexes'
import { dynamoItemsProp } from 'root/src/server/api/lenses'
import { head, prop, replace } from 'ramda'

export default async (userId, token) => {
	const tokenParams = {
		TableName: TABLE_NAME,
		KeyConditionExpression: `${PARTITION_KEY} = :pk and begins_with(${SORT_KEY}, :token)`,
		ExpressionAttributeValues: {
			':pk': `${userId}`,
			':token': `token-${token}|`,
		},
	}

	const dynamoResult = await documentClient.query(tokenParams).promise()

	return replace(`token-${token}|`, '', prop('sk', head(dynamoItemsProp(dynamoResult))))
}
