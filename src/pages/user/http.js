import Http from '@http';

export default{
	queryList: (param) => {
		return Http.get('/config/user/list', param)
			.then((resp) => {
				return resp;
			})
	},
	modifyPwd:(param) => {
		return Http.post('/modifyPwd', param)
		.then((resp) => {
			return Promise.resolve(resp);
		})
	}
}