const AlertModel = require('../model/alertModel');
const AlertCodeModel = require('../model/alertCodeModel');
const AlarmService = require('../service/AlarmService.js')

class AlarmController {
	constructor() {
		this.alertModel = new AlertModel();
		this.alarmService = new AlarmService();
		this.alertCodeModel = new AlertCodeModel();
	}

 async alarmListController(req, res, next) {
		var param = req.query, 
		direction = 'asc', 
		orderBy= 'gmt_create';
		this.alertModel.setSname(param.sname);
		this.alertModel.setHostname(param.hostname);
		this.alertModel.setStartTime(param.starttime);
		this.alertModel.setEndTime(param.endtime);
		if(param.sort) {
			direction	= param.sort.startsWith('-') ? 'asc' : 'desc';
			orderBy = param.sort.slice(1);
		 }
		 this.alertModel.setDirection(direction);
		 this.alertModel.setOrderBy(orderBy);
		 if(param.start && param.limit) {
			 this.alertModel.setStart(Number(param.start));
			 this.alertModel.setLimit(Number(param.limit));
		 }
	 let list =  await this.alarmService.queryAlarmList(this.alertModel, next);
	 let total= await this.alarmService.queryAlarmCount(this.alertModel, next);
	 return res.json({
		 status: 200,
		 error_code: 200,
		 data: list,
		 total: total,
	  })
	}

	async alarmCodeListController(req, res, next) {
		var param = req.query, 
		direction = 'asc', 
		orderBy= 'gmt_create';
		this.alertCodeModel.setErrCode(param.err_code);
		this.alertCodeModel.setErrMesg(param.err_mesg);
		this.alertCodeModel.setStartTime(param.starttime);
		this.alertCodeModel.setEndTime(param.endtime);
		if(param.sort) {
			direction	= param.sort.startsWith('-') ? 'asc' : 'desc';
			orderBy = param.sort.slice(1);
		 }
		 this.alertCodeModel.setDirection(direction);
		 this.alertCodeModel.setOrderBy(orderBy);
		 if(param.start && param.limit) {
			 this.alertCodeModel.setStart(Number(param.start));
			 this.alertCodeModel.setLimit(Number(param.limit));
		 }
	 let list =  await this.alarmService.queryAlarmCodeList(this.alertCodeModel, next);
	 let total= await this.alarmService.queryAlarmCodeCount(this.alertCodeModel, next);
	 return res.json({
		 status: 200,
		 error_code: 200,
		 data: list,
		 total: total,
	  })
	}
}

module.exports = AlarmController;