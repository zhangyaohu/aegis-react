import axios from 'axios';
import Cookies from 'js-cookie';
import {message} from 'antd';

axios.defaults.withCredentials = true;
let config = {
	baseURL: '/api',
	transformRequest: [
		function (data) {
			let ret = '';
			for (let it in data) {
				ret += it + '=' + data[it] + '&'
			}
			console.log(ret);
			return ret;
		}
	],
	transformResponse: [
		function (data) {
			return data
		}
	],
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
	},
	timeout: 10000,
	responseType: 'json',
};

axios.interceptors.request.use((config) => {
	return config;
})
axios.interceptors.response.use(res => {
	if (res.data && res.data.status && res.data.status === 500) {
		return Promise.reject(IEVersion() !== -1 ? JSON.parse(res.data) : res.data);
	} else if (res.data && res.data.status && res.data.status === 200) {
		return Promise.resolve(IEVersion() !== -1 ? JSON.parse(res.data) : res.data)
	} else if (res.data && res.data.status && res.data.status === 401) {

	} else {
		return Promise.resolve(IEVersion() !== -1 ? JSON.parse(res.data) : res.data);
	}
}, (error) => {
	Cookies.set('sid', '');
	if (error.response.status === 401) {
	  message.error(error.response.data.message);
	}
	if (/^[5][0-9][0-9]$/.test(String(error.response.status))) {
	  message.error(error.response.data.message);
	}

	if(/^[4][0-9][0-9]$/.test(String(error.response.status))) {
	  message.error(error.response.data.message);
	}
	return Promise.reject(error.response.data);
})

function IEVersion() {
	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
	var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
	var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
	var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
	if (isIE) {
		var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
		reIE.test(userAgent);
		var fIEVersion = parseFloat(RegExp["$1"]);
		if (fIEVersion == 7) {
			return 7;
		} else if (fIEVersion == 8) {
			return 8;
		} else if (fIEVersion == 9) {
			return 9;
		} else if (fIEVersion == 10) {
			return 10;
		} else {
			return 6;//IE版本<=7
		}
	} else if (isEdge) {
		return 'edge';//edge
	} else if (isIE11) {
		return 11; //IE11  
	} else {
		return -1;//不是ie浏览器
	}
}

let HttpAPI = {
	get(url, params) {
		return axios.get(url, Object.assign({}, config, { params }))
	},

	post(url, params) {
		return axios.post(url, params, config)
	},

	put(url, params) {
		return axios.put(url, params, config)
	},

	delete(url, params) {
		return axios.delete(url, Object.assign({}, config, { params }))
	},

	upload(url, params) {
		return axios.post(url, params, config)
	}
};

export default HttpAPI;