import { SIGN_UP_FORM_MODULE_ID } from 'sls-aws/src/descriptions/modules/moduleIds'
import signUpSchema from 'sls-aws/src/descriptions/formSchemas/signUpSchema'
import signUp from 'sls-aws/src/client-logic/cognito/thunks/signUp'

export default {
	[SIGN_UP_FORM_MODULE_ID]: {
		moduleType: 'form',
		schema: signUpSchema,
		fields: [
			{
				fieldId: 'email',
				label: 'Email',
				inputType: 'text',
				textType: 'email'
			},
			{
				fieldId: 'password',
				label: 'Password',
				inputType: 'text',
				textType: 'password'
			},
			{
				fieldId: 'confirm_password',
				label: 'Confirm password',
				inputType: 'text',
				textType: 'password'
			},
		],
		submits: [
			{ label: 'Sign Up', action: signUp },
		]
	}
}