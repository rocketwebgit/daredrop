import { path } from 'ramda'

import recordClickActionDescriptions from 'sls-aws/src/descriptions/recordClickActions'

export const recordClickActionLabelHof = recordClickActionDescriptionsObj => (
	state, { recordClickActionId },
) => (
	path([recordClickActionId, 'label'], recordClickActionDescriptionsObj)
)

export default recordClickActionLabelHof(recordClickActionDescriptions)
