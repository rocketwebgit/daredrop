import {
	VIEW_PROJECT_ROUTE_ID,
} from 'root/src/shared/descriptions/routes/routeIds'

export default (recordId, pushRoute) => async () => pushRoute(VIEW_PROJECT_ROUTE_ID, { recordId })
