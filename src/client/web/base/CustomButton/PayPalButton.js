import { PayPalButton } from 'react-paypal-button-v2'
import React, { memo } from 'react'

const PayPalButtonUnconnected = memo(({
	payPalCreateOrder, payPalOnApprove,
	customSubmitsData, submitIndex,
}) => (
	<PayPalButton
		createOrder={(data, actions) => payPalCreateOrder(data, actions, { ...customSubmitsData, submitIndex })}
		onApprove={(data, actions) => payPalOnApprove(data, actions, { ...customSubmitsData, submitIndex })}
		options={{
			clientId: PAYPAL_CLIENT_ID,
			intent: 'authorize',
			'disable-funding': 'card,credit,sepa',
		}}
		style={{
			color: 'white',
			layout: 'horizontal',
			shape: 'pill',
			label: 'paypal',
			tagline: false,
		}}
	/>
))

export default PayPalButtonUnconnected