import Http from '@http';

export default{
	queryList: (param) => {
   return Http.get('sql-report/list',param)
		.then((resp) => {
			return resp;
		});
	}
}