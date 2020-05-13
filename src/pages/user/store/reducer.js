import * as constants from './constants';
import { fromJS } from 'immutable'

// 初始默认的state
const defaultState = fromJS({
	result: null
})

const userReducer =  (state = defaultState, action) => {
	switch(action.type) {
	 case constants.USERQUERIYLIAT: 
		 return state.set('result', action.data)
		default:
     return state
	}
}

export default userReducer;