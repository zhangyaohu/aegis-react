import Http from '@http';

export default{
	queryList: (param) => {
   return Http.get('/alarm/list',param)
		.then((resp) => {
			console.log(resp);
			return resp;
		});
	}
}