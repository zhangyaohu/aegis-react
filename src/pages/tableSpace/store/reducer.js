import * as constants from './constants';
import { fromJS } from 'immutable'

// 初始默认的state
const defaultState = fromJS({
	result: null
})

const tableSpaceReducer =  (state = defaultState, action) => {
	switch(action.type) {
	 case constants.ALARMQUERIYLIAT: 
		 return state.set('result', action.data)
		default:
     return state
	}
}

export default tableSpaceReducer;