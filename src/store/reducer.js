import { combineReducers }from 'redux-immutable';
import {reducer as loginReducer} from '@pages/login/store';
import {reducer as menuListRenducer} from '@components/leftNav/store';
import {reducer as alarmReducer} from '@pages/alarm/store';
import {reducer as trendReducer} from '@pages/trend/store';
import {reducer as tableSpaceReducer} from '@pages/tableSpace/store';
import {reducer as sectionSpaceReducer} from '@pages/section/store';
import {reducer as sqlReportReducer} from '@pages/sqlReport/store';
import {reducer as trendMetricReducer} from '@pages/trendMetric/store';
import {reducer as userReducer} from '@pages/user/store';

const reducer = combineReducers({
	login: loginReducer,
	menu: menuListRenducer,
	alarm: alarmReducer,
	trend: trendReducer,
	tableSpace: tableSpaceReducer,
	section: sectionSpaceReducer,
	sqlReport: sqlReportReducer,
	trendMetric: trendMetricReducer,
	user: userReducer
})

export default reducer;