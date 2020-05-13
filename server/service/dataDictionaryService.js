const db = require('../mysql/dbConfig.js');
const Logger = require('../config/logger.js');
class DataDictionaryService {
  async queryColumnList(param,next) {
		let sql = `select * from dicttabcols where`, args = [];
		if(param.service) {
			sql += ` and SERVICE=?`;
			args.push(param.getService());
		}
		if(param.table_name) {
			sql += ` and TABLE_NAME=?`;
			args.push(param.getTableName());
		}
		if(param.owner) {
			sql += ` and OWNER=?`;
			args.push(param.getOwner());
		}
		if(param.starttime && param.endtime) {
			sql+= ` and gmt_create between ? and ?`
			args.push(param.getStartTime());
			args.push(param.getEndTime())
		}
		sql += ` order by ? ?  limit ?,?`;
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
	 
	async queryColumnCount(param, next) {
		let sql = `select count(*) as total from dicttabcols where`, args = [];
		if(param.service) {
			sql += ` and SERVICE=?`;
			args.push(param.getService());
		}
		if(param.table_name) {
			sql += ` and TABLE_NAME=?`;
			args.push(param.getTableName());
		}
		if(param.owner) {
			sql += ` and OWNER=?`;
			args.push(param.getOwner());
		}
		if(param.starttime && param.endtime) {
			sql+= ` and gmt_create between ? and ?`
			args.push(param.getStartTime());
			args.push(param.getEndTime())
		}
		sql += ` order by ? ?`;
		if(sql.indexOf('and') === -1) {
			sql = sql.replace('where', '');
		}else {
			sql = sql.replace('and', (it) => {
				return ''
			})
		}
		args.push(param.getOrderBy());
		args.push(param.getDirection());
		console.log(sql);
		console.log(args);
	  return await db.queryArgs(sql, args,(err,rows) => {
		  if(err){
				Logger.error(err);
				return next();
			}else{
				return rows[0].total;
			}
		 })
	}

	async queryIndexList(param, next) {
		let sql = `select * from dictindexes where`, args = [];
		if(param.service) {
			sql += ` and SERVICE=?`;
			args.push(param.getService());
		}
		if(param.table_name) {
			sql += ` and TABLE_NAME=?`;
			args.push(param.getTableName());
		}
		if(param.owner) {
			sql += ` and OWNER=?`;
			args.push(param.getOwner());
		}
		if(param.starttime && param.endtime) {
			sql+= ` and gmt_create between ? and ?`
			args.push(param.getStartTime());
			args.push(param.getEndTime())
		}
		sql += ` order by ? ?  limit ?,?`;
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

	async queryIndexCount(param, next) {
		let sql = `select count(*) as total from dictindexes where`, args = [];
		if(param.service) {
			sql += ` and SERVICE=?`;
			args.push(param.getService());
		}
		if(param.table_name) {
			sql += ` and TABLE_NAME=?`;
			args.push(param.getTableName());
		}
		
		if(param.starttime && param.endtime) {
			sql+= ` and gmt_create between ? and ?`
			args.push(param.getStartTime());
			args.push(param.getEndTime())
		}
		sql += ` order by ? ?`;
		if(sql.indexOf('and') === -1) {
			sql = sql.replace('where', '');
		}else {
			sql = sql.replace('and', (it) => {
				return ''
			})
		}
		args.push(param.getOrderBy());
		args.push(param.getDirection());
	  return await db.queryArgs(sql, args,(err,rows) => {
		  if(err){
				Logger.error(err);
				return next();
			}else{
				return rows[0].total;
			}
		 })
	}
}

module.exports = DataDictionaryService;