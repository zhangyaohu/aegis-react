import * as constans from './constants'
export const login = (data) =>{
	return {
		type: constans.LOGIN,
		data
	}
}