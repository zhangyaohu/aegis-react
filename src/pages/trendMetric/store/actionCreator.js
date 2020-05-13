import * as constans from './constants'
export const setChartData = (data) =>{
	return {
		type: constans.SETCHARTDATA,
		data
	}
}