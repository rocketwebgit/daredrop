import reduxConnector from 'root/src/shared/util/reduxConnector'

import getUserDataSelector from 'root/src/client/logic/api/selectors/getUserDataSelector'
import recordIdSelector from 'root/src/client/logic/api/selectors/recordIdSelector'

import canApproveProjectSelector from 'root/src/client/logic/project/selectors/canApproveProjectSelector'
import canEditProjectDetailsSelector from 'root/src/client/logic/project/selectors/canEditProjectDetailsSelector'
import canRejectActiveProjectSelector from 'root/src/client/logic/project/selectors/canRejectActiveProjectSelector'
import canRejectProjectSelector from 'root/src/client/logic/project/selectors/canRejectProjectSelector'
import canPledgeProjectSelector from 'root/src/client/logic/project/selectors/canPledgeProjectSelector'
import createdSelector from 'root/src/client/logic/project/selectors/createdSelector'
import daysToGoSelector from 'root/src/client/logic/project/selectors/daysToGoSelector'
import favoritesAmountSelector from 'root/src/client/logic/project/selectors/favoritesAmountSelector'
import favoritesProcessingSelector from 'root/src/client/logic/project/selectors/favoritesProcessingSelector'
import myFavoritesSelector from 'root/src/client/logic/project/selectors/myFavoritesSelector'
import myPledgeSelector from 'root/src/client/logic/project/selectors/myPledgeSelector'
import pledgeAmountSelector from 'root/src/client/logic/project/selectors/pledgeAmountSelector'
import pledgersSelector from 'root/src/client/logic/project/selectors/pledgersSelector'
import projectAssigneesSelector from 'root/src/client/logic/project/selectors/projectAssigneesSelector'
import projectDescriptionSelector from 'root/src/client/logic/project/selectors/projectDescriptionSelector'
import projectGameImageSquareSelector from 'root/src/client/logic/project/selectors/projectGameImageSquareSelector'
import projectTitleSelector from 'root/src/client/logic/project/selectors/projectTitleSelector'
import statusSelector from 'root/src/client/logic/project/selectors/statusSelector'
import approvedVideoUrlSelector from 'root/src/client/logic/project/selectors/approvedVideoUrlSelector'
import isOneOfAssignesSelector from 'root/src/client/logic/project/selectors/isOneOfAssigneesSelector'
import projectAcceptanceStatusSelector from 'root/src/client/logic/project/selectors/projectAcceptanceStatusSelector'

import isAuthenticatedSelector from 'root/src/client/logic/auth/selectors/isAuthenticated'

import addToFavorites from 'root/src/client/logic/project/thunks/addToFavorites'
import pushRoute from 'root/src/client/logic/route/thunks/pushRoute'
import removeToFavorites from 'root/src/client/logic/project/thunks/removeToFavorites'
import updateProject from 'root/src/client/logic/project/thunks/updateProject'

export default reduxConnector(
	[
		['assignees', projectAssigneesSelector],
		['canApproveProject', canApproveProjectSelector],
		['canEditProjectDetails', canEditProjectDetailsSelector],
		['canPledgeProject', canPledgeProjectSelector],
		['canRejectActiveProject', canRejectActiveProjectSelector],
		['canRejectProject', canRejectProjectSelector],
		['created', createdSelector],
		['daysToGo', daysToGoSelector],
		['favoritesAmount', favoritesAmountSelector],
		['favoritesProcessing', favoritesProcessingSelector],
		['gameImage', projectGameImageSquareSelector],
		['isAuthenticated', isAuthenticatedSelector],
		['myFavorites', myFavoritesSelector],
		['myPledge', myPledgeSelector],
		['pledgeAmount', pledgeAmountSelector],
		['pledgers', pledgersSelector],
		['projectId', recordIdSelector],
		['projectDescription', projectDescriptionSelector],
		['projectTitle', projectTitleSelector],
		['status', statusSelector],
		['userData', getUserDataSelector],
		['approvedVideoUrl', approvedVideoUrlSelector],
		['isOneOfAssignees', isOneOfAssignesSelector],
		['projectAcceptanceStatus', projectAcceptanceStatusSelector],
	],
	[
		['addToFavorites', addToFavorites],
		['pushRoute', pushRoute],
		['removeToFavorites', removeToFavorites],
		['updateProject', updateProject],
	],
)
