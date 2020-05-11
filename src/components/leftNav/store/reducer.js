import * as constants from './constants';
import { fromJS } from 'immutable'
import { alarmList } from '@components/leftNav/menuList.js';

// 初始默认的state
const defaultState = fromJS({
	menuList: alarmList
})

const menuReducer =  (state = defaultState, action) => {
	switch(action.type) {
	 case constants.GETMENULIST: 
		 return state.set('menuList', action.data)
		default:
     return state
	}
}

export default menuReducer;