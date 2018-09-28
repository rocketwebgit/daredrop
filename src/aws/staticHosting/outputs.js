import ref from 'sls-aws/src/aws/util/ref'

import {
	RECORD_SET,
} from 'sls-aws/src/aws/staticHosting/resourceIds'

import {
	DOMAIN_NAME,
} from 'sls-aws/src/aws/staticHosting/outputIds'

export default {
	[DOMAIN_NAME]: {
		Description: 'Route53 RecordSet domain name',
		Value: ref(RECORD_SET),
	},
}