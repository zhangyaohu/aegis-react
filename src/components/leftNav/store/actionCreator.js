import * as constans from './constants'
export const getMenuList = (data) =>{
	return {
		type: constans.GETMENULIST,
		data
	}
}