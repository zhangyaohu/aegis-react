const db = require('../mysql/dbConfig.js');
const Logger = require('../config/logger.js');
class UserService {
  async queryUserList(param,next) {
		let sql = `select * from users where`, args = [];
		if(param.id){
			sql = ` and id = ?`;
			args.push(param.getId());
		}
	  if( param.user_name){ 
		 sql += `and username =?`
		 args.push(param.getUserName());
		}
		if(param.starttime && param.endtime) {
			sql+= ` and gmt_create between ? and ?`
			args.push(param.getStartTime());
			args.push(param.getEndTime())
		}
		sql += ` order by ? ? limit ?,?`;
		if(sql.indexOf('and') === -1) {
			sql = sql.replace('where', '');
		}else {
			sql = sql.replace('and', (it) => {
				return ''
			})
		}
		args.push(param.getOrderBy());
		args.push(param.getDirection());
		args.push(param.getStart());
		args.push(param.getLimit());
	  return await db.queryArgs(sql, args,(err,rows) => {
		  if(err){
				Logger.error(err);
				return next();
			}else{
				return rows;
			}
		 })
	}
	 
	async queryUserCount(param, next) {
		let sql = `select count(*) as total from users where`,args = [];
		if(param.id){
			sql = ` and id = ?`;
			args.push(param.getId());
		}
	  if( param.user_name){ 
		 sql += `and username =?`
		 args.push(param.getUserName());
		}
		if(param.starttime && param.endtime) {
			sql+= ` and gmt_create between ? and ?`
			args.push(param.getStartTime());
			args.push(param.getEndTime())
		}
		sql += ` order by ? ? limit ?,?`;
		if(sql.indexOf('and') === -1) {
			sql = sql.replace('where', '');
		}else {
			sql = sql.replace('and', (it) => {
				return ''
			})
		}
		args.push(param.getOrderBy());
		args.push(param.getDirection());
		args.push(param.getStart());
		args.push(param.getLimit());
		console.log(sql);
	  return await db.queryArgs(sql, args,(err,rows) => {
		  if(err){
				Logger.error(err);
				return next();
			}else{
				return rows[0].total;
			}
		 })
	}

	async queryRoleList(param, next) {
		let sql = `select * from roles_users where`,args = [];
		if(param.id){
			sql = ` and id = ?`;
			args.push(param.getId());
		}
	  if( param.user_name){ 
		 sql += `and user_name =?`
		 args.push(param.getUserName());
		}
		if(param.role_name) {
			sql += `and role_name =?`
			args.push(param.getRoleName());
		}
		if(param.starttime && param.endtime) {
			sql+= ` and gmt_create between ? and ?`
			args.push(param.getStartTime());
			args.push(param.getEndTime())
		}
		sql += ` order by ? ? limit ?,?`;
		if(sql.indexOf('and') === -1) {
			sql = sql.replace('where', '');
		}else {
			sql = sql.replace('and', (it) => {
				return ''
			})
		}
		args.push(param.getOrderBy());
		args.push(param.getDirection());
		args.push(param.getStart());
		args.push(param.getLimit());
	  return await db.queryArgs(sql, args,(err,rows) => {
		  if(err){
				Logger.error(err);
				return next();
			}else{
				return rows;
			}
		 })
	}

	async queryRoleCount(param, next) {
		let sql = `select count(*) as total from roles_users where`,args = [];
		if(param.id){
			sql = ` and id = ?`;
			args.push(param.getId());
		}
	  if( param.username){ 
		 sql += `and user_name =?`
		 args.push(param.getUserName());
		}
		if(param.role_name) {
			sql += `and role_name =?`
			args.push(param.getRoleName());
		}
		if(param.starttime && param.endtime) {
			sql+= ` and gmt_create between ? and ?`
			args.push(param.getStartTime());
			args.push(param.getEndTime())
		}
		sql += ` order by ? ? limit ?,?`;
		if(sql.indexOf('and') === -1) {
			sql = sql.replace('where', '');
		}else {
			sql = sql.replace('and', (it) => {
				return ''
			})
		}
		args.push(param.getOrderBy());
		args.push(param.getDirection());
		args.push(param.getStart());
		args.push(param.getLimit());
	  return await db.queryArgs(sql, args,(err,rows) => {
		  if(err){
				Logger.error(err);
				return next();
			}else{
				return rows[0].total;
			}
		 })
	}

	async queryRolesList(param, next) {
		let sql = `select * from roles where`,args = [];
		if(param.id){
			sql = ` and id = ?`;
			args.push(param.getId());
		}
	  if( param.name){ 
		 sql += `and name =?`
		 args.push(param.getName());
		}
		if(param.owner) {
			sql += `and owner =?`
			args.push(param.getOwner());
		}
		if(param.starttime && param.endtime) {
			sql+= ` and gmt_create between ? and ?`
			args.push(param.getStartTime());
			args.push(param.getEndTime())
		}
		sql += ` order by ? ? limit ?,?`;
		if(sql.indexOf('and') === -1) {
			sql = sql.replace('where', '');
		}else {
			sql = sql.replace('and', (it) => {
				return ''
			})
		}
		args.push(param.getOrderBy());
		args.push(param.getDirection());
		args.push(param.getStart());
		args.push(param.getLimit());
		console.log(sql);
	  return await db.queryArgs(sql, args,(err,rows) => {
		  if(err){
				Logger.error(err);
				return next();
			}else{
				return rows;
			}
		 })
	}

	async queryRolesCount(param, next) {
		let sql = `select count(*) as total from roles where`,args = [];
		if(param.id){
			sql = ` and id = ?`;
			args.push(param.getId());
		}
	  if( param.name){ 
		 sql += `and name =?`
		 args.push(param.getName());
		}
		if(param.owner) {
			sql += `and owner =?`
			args.push(param.getOwner());
		}
		if(param.starttime && param.endtime) {
			sql+= ` and gmt_create between ? and ?`
			args.push(param.getStartTime());
			args.push(param.getEndTime())
		}
		sql += ` order by ? ? limit ?,?`;
		if(sql.indexOf('and') === -1) {
			sql = sql.replace('where', '');
		}else {
			sql = sql.replace('and', (it) => {
				return ''
			})
		}
		args.push(param.getOrderBy());
		args.push(param.getDirection());
		args.push(param.getStart());
		args.push(param.getLimit());
	  return await db.queryArgs(sql, args,(err,rows) => {
		  if(err){
				Logger.error(err);
				return next();
			}else{
				return rows[0].total;
			}
		 })
	}

	async queryRankList(param, next) {
		let sql = `select  *, count(*) as cnt, MAX(gmt_create) as last_time  from users_logins where`,args = [];
		if(param.id){
			sql = ` and id = ?`;
			args.push(param.getId());
		}
	  if( param.user_name){ 
		 sql += `and user_name =?`
		 args.push(param.getUserName());
		}
		if(param.starttime && param.endtime) {
			sql+= ` and gmt_create between ? and ?`
			args.push(param.getStartTime());
			args.push(param.getEndTime())
		}
		sql += ` group by user_name order by ? ?  limit ?,?`;
		if(sql.indexOf('and') === -1) {
			sql = sql.replace('where', '');
		}else {
			sql = sql.replace('and', (it) => {
				return ''
			})
		}
		args.push(param.getOrderBy());
		args.push(param.getDirection());
		args.push(param.getStart());
		args.push(param.getLimit());
	  return await db.queryArgs(sql, args,(err,rows) => {
		  if(err){
				Logger.error(err);
				return next();
			}else{
				return rows;
			}
		 })
	}

	async queryRankCount(param, next) {
		let sql = `select count(*) as cnt from users_logins where`,args = [];
		if(param.id){
			sql = ` and id = ?`;
			args.push(param.getId());
		}
	  if( param.user_name){ 
		 sql += `and user_name =?`
		 args.push(param.getUserName());
		}
		if(param.starttime && param.endtime) {
			sql+= ` and gmt_create between ? and ?`
			args.push(param.getStartTime());
			args.push(param.getEndTime())
		}
		sql += ` group by user_name order by ? ?`;
		if(sql.indexOf('and') === -1) {
			sql = sql.replace('where', '');
		}else {
			sql = sql.replace('and', (it) => {
				return ''
			})
		}
		args.push(param.getOrderBy());
		args.push(param.getDirection());
	  return await db.queryArgs(`SELECT count(t.cnt) as total FROM (${sql}) as t`, args,(err,rows) => {
		  if(err){
				Logger.error(err);
				return next();
			}else{
				return rows[0].total;
			}
		 })
	}
}

module.exports = UserService;