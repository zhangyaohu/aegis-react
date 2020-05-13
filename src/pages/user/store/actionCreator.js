import * as constans from './constants'
export const queryList = (data) =>{
	return {
		type: constans.USERQUERIYLIAT,
		data
	}
}