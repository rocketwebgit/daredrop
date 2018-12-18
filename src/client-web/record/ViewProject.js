import { map, addIndex } from 'ramda'
import React, { memo } from 'react'

import Assignee from 'sls-aws/src/client-web/record/Assignee'

import RecordClickActionButton from 'sls-aws/src/client-web/base/RecordClickActionButton'
import { APPROVE_PROJECT } from 'sls-aws/src/descriptions/recordClickActions/recordClickActionIds'

import viewProjectConnector from 'sls-aws/src/client-logic/project/connectors/viewProjectConnector'
import withModuleContext from 'sls-aws/src/util/withModuleContext'

import { orNull } from 'sls-aws/src/util/ramdaPlus'

export const ViewProjectModule = memo(({
	projectId, projectDescription, projectTitle, pledgeAmount, myPledge, status,
	assignees, canApproveProject,
}) => (
	<div className="layout-column">
		<div>Project Status: {status}</div>
		<div>{ projectTitle }</div>
		<div>{ projectDescription }</div>
		<div>Pledge Amount: {pledgeAmount}</div>
		<div>My Pledge Amount: {myPledge}</div>
		{addIndex(map)((assignee, i) => (
			<Assignee key={i} {...assignee} />
		), assignees)}
		{orNull(
			canApproveProject,
			<RecordClickActionButton
				recordClickActionId={APPROVE_PROJECT}
				recordId={projectId}
			/>,
		)}
	</div>
))

export default withModuleContext(viewProjectConnector(ViewProjectModule))