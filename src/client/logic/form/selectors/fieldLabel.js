import { path } from 'ramda'

import moduleDescriptions from 'sls-aws/src/shared/descriptions/modules'
import moduleIdFromKey from 'sls-aws/src/client/logic/route/util/moduleIdFromKey'

export default (state, { moduleKey, fieldDescPath }) => path(
	[moduleIdFromKey(moduleKey), 'fields', ...fieldDescPath, 'label'],
	moduleDescriptions,
)