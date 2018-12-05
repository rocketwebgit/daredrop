import { set, lensProp } from 'ramda'

import apiRequest from 'sls-aws/src/client-logic/api/thunks/apiRequest'

import { CREATE_PROJECT } from 'sls-aws/src/descriptions/endpoints/endpointIds'

export default formData => async (dispatch) => {
	const { stripeCardId } = formData
	console.log('hello', stripeCardId)
	const stripeRes = await stripeCardId.createSource({
		type: 'card', usage: 'reusable', currency: 'usd',
	})
	console.log(stripeRes)
	const apiPayload = set(lensProp('stripeCardId'), stripeRes.source.id, formData)
	console.log(apiPayload)
	return dispatch(apiRequest(CREATE_PROJECT, apiPayload))
}