const ColumnModel = require('../model/columnModel');
const IndexModel = require('../model/indexModel');
const RolesModel = require('../model/roleModel');
const RankModel = require('../model/rankModel');
const DataDictionaryService = require('../service/dataDictionaryService.js');

class DataDictionaryController {
	constructor() {
		this.columnModel = new ColumnModel();
		this.indexModel = new IndexModel();
		this.dataDictionaryService = new DataDictionaryService();
	}

 async columnController(req, res, next) {
		var param = req.query, 
		direction = 'asc', 
		orderBy= 'gmt_create';
		this.columnModel.setTableName(param.table_name);
		this.columnModel.setService(param.service);
		this.columnModel.setStartTime(param.starttime);
		this.columnModel.setOwner(param.owner);
		this.columnModel.setEndTime(param.endtime);
		if(param.sort) {
			direction	= param.sort.startsWith('-') ? 'asc' : 'desc';
			orderBy = param.sort.slice(1);
		 }
		 this.columnModel.setDirection(direction);
		 this.columnModel.setOrderBy(orderBy);
		 if(param.start && param.limit) {
			 this.columnModel.setStart(Number(param.start));
			 this.columnModel.setLimit(Number(param.limit));
		 }
	 let list =  await this.dataDictionaryService.queryColumnList(this.columnModel, next);
	 let total= await this.dataDictionaryService.queryColumnCount(this.columnModel, next);
	 return res.json({
		 status: 200,
		 error_code: 200,
		 data: list,
		 total: total,
	  })
	}

	async indexController(req, res, next) {
		var param = req.query, 
		direction = 'asc', 
		orderBy= 'gmt_create';
		this.indexModel.setService(param.service);
		this.indexModel.setOwner(param.owner);
		this.indexModel.setTableName(param.table_name);
		this.indexModel.setStartTime(param.starttime);
		this.indexModel.setEndTime(param.endtime);
		if(param.sort) {
			direction	= param.sort.startsWith('-') ? 'asc' : 'desc';
			orderBy = param.sort.slice(1);
		 }
		 this.indexModel.setDirection(direction);
		 this.indexModel.setOrderBy(orderBy);
		 if(param.start && param.limit) {
			 this.indexModel.setStart(Number(param.start));
			 this.indexModel.setLimit(Number(param.limit));
		 }
	 let list =  await this.dataDictionaryService.queryIndexList(this.indexModel, next);
	 let total= await this.dataDictionaryService.queryIndexCount(this.indexModel, next);
	 return res.json({
		 status: 200,
		 error_code: 200,
		 data: list,
		 total: total,
	  })
	}
	async userRolesListController(req, res, next) {
		var param = req.query, 
		direction = 'asc', 
		orderBy= 'gmt_create';
		this.rolesModel.setId(param.id);
		this.rolesModel.setOwner(param.owner);
		this.rolesModel.setName(param.name);
		this.rolesModel.setStartTime(param.starttime);
		this.rolesModel.setEndTime(param.endtime);
		if(param.sort) {
			direction	= param.sort.startsWith('-') ? 'asc' : 'desc';
			orderBy = param.sort.slice(1);
		 }
		 this.rolesModel.setDirection(direction);
		 this.rolesModel.setOrderBy(orderBy);
		 if(param.start && param.limit) {
			 this.rolesModel.setStart(Number(param.start));
			 this.rolesModel.setLimit(Number(param.limit));
		 }
	 let list =  await this.userService.queryRolesList(this.rolesModel, next);
	 let total= await this.userService.queryRolesCount(this.rolesModel, next);
	 return res.json({
		 status: 200,
		 error_code: 200,
		 data: list,
		 total: total,
	  })
	}

	async userRankListController(req, res, next) {
		var param = req.query, 
		direction = 'asc', 
		orderBy= 'last_time';
		this.rankModel.setId(param.id);
		this.rankModel.setUserName(param.user_name);
		this.rankModel.setStartTime(param.starttime);
		this.rankModel.setEndTime(param.endtime);
		if(param.sort) {
			direction	= param.sort.startsWith('-') ? 'asc' : 'desc';
			orderBy = param.sort.slice(1);
		 }
		 this.rankModel.setDirection(direction);
		 this.rankModel.setOrderBy(orderBy);
		 if(param.start && param.limit) {
			 this.rankModel.setStart(Number(param.start));
			 this.rankModel.setLimit(Number(param.limit));
		 }
	 let list =  await this.userService.queryRankList(this.rankModel, next);
	 let total= await this.userService.queryRankCount(this.rankModel, next);
	 return res.json({
		 status: 200,
		 error_code: 200,
		 data: list,
		 total: total,
	  })
	}
}

module.exports = DataDictionaryController;