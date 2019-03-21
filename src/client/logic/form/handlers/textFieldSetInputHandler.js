import {
	cardNumberValidation,
	securityCodeValidation,
	expirationDateValidation,
	zipCodeValidation,
} from 'root/src/client/logic/form/util/creditCardValidations'

export default (moduleKey, fieldPath, action, fieldType) => (e) => {
	e.preventDefault()
	let { value } = e.target
	if (fieldType === 'number') {
		value = parseInt(value, 10)
	}
	if (fieldPath[0] === 'cardNumber') {
		value = cardNumberValidation(value)
	}
	if (fieldPath[0] === 'securityCode') {
		value = securityCodeValidation(value)
	}
	if (fieldPath[0] === 'expirationDate') {
		value = expirationDateValidation(value)
	}
	if (fieldPath[0] === 'zipCode') {
		value = zipCodeValidation(value)
	}
	action(moduleKey, fieldPath, value)
}
