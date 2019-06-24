import getAtt from 'root/src/aws/util/getAtt'

import {
	API_LAMBDA_FUNCTION, API_LAMBDA_LONG_TASK_FUNCTION,
	API_DYNAMO_DB_TABLE, PERFORMANCE_TEST_DYNAMODB_DATA_TABLE,
	API_CLOUDWATCH_EVENTS_ROLE,
} from 'root/src/aws/api/resourceIds'

import {
	API_FUNCTION_ARN, API_LONG_TASK_FUNCTION_ARN, API_DYNAMO_TABLE_NAME,
	API_CLOUDWATCH_EVENTS_IAM_ROLE, PERFORMANCE_TEST_DYNAMODB_DATA_TABLE_ARN,
} from 'root/src/aws/api/outputIds'

export default {
	[API_FUNCTION_ARN]: {
		Description: 'Api Lambd fn arn',
		Value: getAtt(API_LAMBDA_FUNCTION, 'Arn'),
	},
	[API_DYNAMO_TABLE_NAME]: {
		Description: 'Api dynamodb table name',
		Value: getAtt(API_DYNAMO_DB_TABLE, 'Arn'),
	},
	[API_LONG_TASK_FUNCTION_ARN]: {
		Description: 'Api lambda for long running tasks',
		Value: getAtt(API_LAMBDA_LONG_TASK_FUNCTION, 'Arn'),
	},
	[PERFORMANCE_TEST_DYNAMODB_DATA_TABLE_ARN]: {
		Description: 'Api dynamodb table name for performance testing',
		Value: getAtt(PERFORMANCE_TEST_DYNAMODB_DATA_TABLE, 'Arn'),
	},
	[API_CLOUDWATCH_EVENTS_IAM_ROLE]: {
		Description: 'IAM role for cloudwatch events',
		Value: getAtt(API_CLOUDWATCH_EVENTS_ROLE, 'Arn'),
	},
}
