import * as constants from './constants';
import { fromJS } from 'immutable'

// 初始默认的state
const defaultState = fromJS({
	chartData: null
})

const trendMetricReducer =  (state = defaultState, action) => {
	switch(action.type) {
	 case constants.SETCHARTDATA: 
		 return state.set('chartData', action.data)
		default:
     return state
	}
}

export default trendMetricReducer;