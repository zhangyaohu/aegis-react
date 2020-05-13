const UsersModel = require('../model/usersModel');
const RoleListModel = require('../model/roleListModel');
const RolesModel = require('../model/roleModel');
const RankModel = require('../model/rankModel');
const UserService = require('../service/usersService.js');

class UserController {
	constructor() {
		this.usersModel = new UsersModel();
		this.userService = new UserService();
		this.roleListModel = new RoleListModel();
		this.rolesModel = new RolesModel();
		this.rankModel = new RankModel();
	}

 async userListController(req, res, next) {
		var param = req.query, 
		direction = 'asc', 
		orderBy= 'gmt_create';
		this.usersModel.setId(param.id);
		this.usersModel.setUserName(param.user_name);
		this.usersModel.setStartTime(param.starttime);
		this.usersModel.setEndTime(param.endtime);
		if(param.sort) {
			direction	= param.sort.startsWith('-') ? 'asc' : 'desc';
			orderBy = param.sort.slice(1);
		 }
		 this.usersModel.setDirection(direction);
		 this.usersModel.setOrderBy(orderBy);
		 if(param.start && param.limit) {
			 this.usersModel.setStart(Number(param.start));
			 this.usersModel.setLimit(Number(param.limit));
		 }
	 let list =  await this.userService.queryUserList(this.usersModel, next);
	 let total= await this.userService.queryUserCount(this.usersModel, next);
	 return res.json({
		 status: 200,
		 error_code: 200,
		 data: list,
		 total: total,
	  })
	}

	async userRoleListController(req, res, next) {
		var param = req.query, 
		direction = 'asc', 
		orderBy= 'gmt_create';
		this.roleListModel.setId(param.id);
		this.roleListModel.setUserName(param.user_name);
		this.roleListModel.setRoleName(param.role_name);
		this.roleListModel.setStartTime(param.starttime);
		this.roleListModel.setEndTime(param.endtime);
		if(param.sort) {
			direction	= param.sort.startsWith('-') ? 'asc' : 'desc';
			orderBy = param.sort.slice(1);
		 }
		 this.roleListModel.setDirection(direction);
		 this.roleListModel.setOrderBy(orderBy);
		 if(param.start && param.limit) {
			 this.roleListModel.setStart(Number(param.start));
			 this.roleListModel.setLimit(Number(param.limit));
		 }
	 let list =  await this.userService.queryRoleList(this.roleListModel, next);
	 let total= await this.userService.queryRoleCount(this.roleListModel, next);
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

module.exports = UserController;