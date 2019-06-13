import { SecretsManager } from 'aws-sdk'
import paypalRestSDK from 'paypal-rest-sdk'

const secretsClient = new SecretsManager()
const secretName = 'PayPal_Test'
const mode = 'sandbox'

export default new Promise((resolve, reject) => {
	secretsClient.getSecretValue({ SecretId: secretName }, (err, data) => {
		if (err) {
			reject(err)
		}
		const { PayPal_Test_ID: clientId, PayPal_Test_Secret: clientSecret } = JSON.parse(data.SecretString)

		paypalRestSDK.configure({
			mode,
			client_id: clientId,
			client_secret: clientSecret,
		})
		resolve(paypalRestSDK)
	})
})