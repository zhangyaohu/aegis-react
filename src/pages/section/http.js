import Http from '@http';

export default{
	queryList: (param) => {
   return Http.get('/segspace/list',param)
		.then((resp) => {
			console.log(resp);
			return resp;
		});
	}
}