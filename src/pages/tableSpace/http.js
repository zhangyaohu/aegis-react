import Http from '@http';

export default{
	queryList: (param) => {
   return Http.get('/tabspace/list',param)
		.then((resp) => {
			return resp;
		});
	}
}