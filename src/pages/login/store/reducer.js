import * as constants from './constants';
import { fromJS } from 'immutable'

// 初始默认的state
const defaultState = fromJS({
	result: null
})

const loginReducer =  (state = defaultState, action) => {
	switch(action.type) {
	 case constants.LOGIN: 
		 return state.set('result', action.data)
		default:
     return state
	}
}

export default loginReducer;