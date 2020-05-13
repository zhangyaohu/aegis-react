import { uniqBy } from 'lodash';
export const formatDateTime = (data, format) => {
	if (!data) return;
	let date = new Date(data);
	var o = {
		"M+": date.getMonth() + 1, //month	
		"d+": date.getDate(), //day
		"h+": date.getHours(), //hour	
		"m+": date.getMinutes(), //minute	
		"s+": date.getSeconds(), //second	
		"q+": Math.floor((date.getMonth() + 3) / 3), //quarter	
		"S": date.getMilliseconds() //millisecond
	}
	//格式化年匹配y的时表示有年
	if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
		(date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o) if (new RegExp("(" + k + ")").test(format))
		format = format.replace(RegExp.$1,
			RegExp.$1.length == 1 ? o[k] :
				("00" + o[k]).substr(("" + o[k]).length));
	return format;
}

export const getService = (data) => {
	if(!!data){
		let arr = data.map(item => {
			return {
				label: item.service || item.SERVICE,
				value: item.service || item.SERVICE
			}
		})
		return uniqBy(arr, (item) => item.value)
	}
	else return []
}

export const formatSize = (bytes, unit, width) => {
	bytes = Number(bytes);
	// if (bytes < 1 && bytes > 0)
	if (typeof bytes !== 'number' || isNaN(bytes)) bytes = 0;
	if (bytes < 0) bytes = 0;
	if (typeof width === 'undefined') width = 2;
	if (typeof unit === 'undefined') unit = 'B';
	var num = Math.pow(10, width);
	var sizes = ['K', 'M', 'G', 'T', 'P'];
	if (unit) {
		sizes.unshift('')
	} else {
		sizes.unshift('Byte')
	}
	if (bytes === 0) return '0 ' + sizes[0] + unit;
	var i = Math.floor(Math.log(bytes) / Math.log(1024));
	// for 0.xxxx number
	if (i < 0) i = 0;
	if (sizes[i] === 'B') num = 1;
	if (i >= 5) i = 5;
	return Math.round(bytes / Math.pow(1024, i) * num) / num + ' ' + sizes[i] + unit
}