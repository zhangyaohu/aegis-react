import Http from '@http';

export default{
	login: (param) => {
   return Http.post('/login',param)
		.then((resp) => {
			console.log(resp);
			return resp;
		});
	}
}