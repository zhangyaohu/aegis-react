import Http from '@http';

export default {
	queryMetric: (param) => {
		return Http.get('/curves/dispbyh', param)
			.then((resp) => {
				return resp;
			});
	}
}