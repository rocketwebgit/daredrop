import reduxConnector from 'root/src/shared/util/reduxConnector'

import formFieldTypes from 'root/src/client/logic/form/selectors/formFieldTypes'
import formSubmits from 'root/src/client/logic/form/selectors/formSubmits'
import formTitle from 'root/src/client/logic/form/selectors/formTitle'
import formSubTitle from 'root/src/client/logic/form/selectors/formSubTitle'
import formPreSubmitText from 'root/src/client/logic/form/selectors/formPreSubmitText'
import formPostSubmitText from 'root/src/client/logic/form/selectors/formPostSubmitText'
import formPreSubmitCaption from 'root/src/client/logic/form/selectors/formPreSubmitCaption'
import formPostSubmitCaption from 'root/src/client/logic/form/selectors/formPostSubmitCaption'
import backButton from 'root/src/client/logic/form/selectors/backButton'
import moduleKey from 'root/src/client/logic/route/selectors/moduleKey'

import submitForm from 'root/src/client/logic/form/thunks/submitForm'

export default reduxConnector(
	[
		['moduleKey', moduleKey],
		['formFieldTypes', formFieldTypes],
		['formSubmits', formSubmits],
		['formTitle', formTitle],
		['subTitle', formSubTitle],
		['preSubmitText', formPreSubmitText],
		['postSubmitText', formPostSubmitText],
		['preSubmitCaption', formPreSubmitCaption],
		['postSubmitCaption', formPostSubmitCaption],
		['backButton', backButton],
	],
	[
		['submitForm', submitForm],
	],
)
