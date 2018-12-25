import React, { memo } from 'react'

import Button from '@material-ui/core/Button'
import {
	primaryColor, secondaryColor,
} from 'sls-aws/src/client-web/commonStyles'

import { withStyles } from '@material-ui/core/styles'

const styles = {
	button: {
		color: 'white',
		backgroundColor: primaryColor,
		'&:hover': {
			backgroundColor: secondaryColor,
		},
		width: '100%',
	},
}

export const ButtonUnstyled = memo(({
	classes, onClick, disabled, children,
}) => (
	<Button
		className={classes.button}
		onClick={onClick}
		disabled={disabled}
	>
		{children}
	</Button>
))

export default withStyles(styles)(ButtonUnstyled)
