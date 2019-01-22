import { map } from 'ramda'
import React, { memo } from 'react'

import classNames from 'classnames'

import { ternary } from 'sls-aws/src/shared/util/ramdaPlus'

import ProjectCard from 'sls-aws/src/client/web/list/ProjectCard'
import MaxWidthContainer from 'sls-aws/src/client/web/base/MaxWidthContainer'
import withModuleContext from 'sls-aws/src/client/util/withModuleContext'

import List from '@material-ui/core/List'

import listModuleConnector from 'sls-aws/src/client/logic/api/connectors/listModuleConnector'

const styles = {
	paddingOffset: {
		margin: [[0, -10]],
	},
}

export const ListModuleUnconnected = memo(({
	list, listType, classes,
}) => ternary(
	listType === 'card',
	<div className="flex layout-row layout-align-center-start">
		<MaxWidthContainer>
			<div className="flex layout-row layout-align-center">
				<div
					className={classNames(
						classes.paddingOffset,
						'layout-row layout-wrap',
					)}
				>
					{map(recordId => (
						<ProjectCard key={recordId} recordId={recordId} />
					), list)}
				</div>
			</div>
		</MaxWidthContainer>
	</div>,
	<List>
		{map(recordId => (
			<ProjectCard key={recordId} recordId={recordId} />
		), list)}
	</List>,
))

export default withModuleContext(
	listModuleConnector(ListModuleUnconnected, styles),
)