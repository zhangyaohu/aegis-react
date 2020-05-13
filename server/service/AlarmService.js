const db = require('../mysql/dbConfig.js');
const Logger = require('../config/logger.js');
class AlarmService {
  async queryAlarmList(param,next) {
		let sql = `select * from alerts where sname = ?  and 'gmt_create' between ? and ? order by ? ? limit ?,?`;
	  return await db.queryArgs(sql, [param.getSname(), param.getStartTime(), param.getEndTime(),param.getOrderBy(), param.getDirection(), param.getStart(),param.getLimit()],(err,rows) => {
		  if(err){
				Logger.error(err);
				return next();
			}else{
				return rows;
			}
		 })
	}
	 
	async queryAlarmCount(param, next) {
		let sql = `select count(*) as total from alerts where sname = ?  and 'gmt_create' between ? and ? order by ? ?`;
	  return await db.queryArgs(sql, [param.getSname(), param.getStartTime(), param.getEndTime(),param.getOrderBy(), param.getDirection(), param.getStart(),param.getLimit()],(err,rows) => {
		  if(err){
				Logger.error(err);
				return next();
			}else{
				return rows[0].total;
			}
		 })
	}

	async queryAlarmCodeList(param, next) {
		let sql = `select *, concat(err_code, "\r\t", err_mesg) as message from alerts_codes where err_code =? and err_mesg =?  and 'gmt_create' between ? and ? order by ? ? limit ?,?`;
	  return await db.queryArgs(sql, [param.getErrCode(), param.getErrMesg(), param.getStartTime(), param.getEndTime(),param.getOrderBy(), param.getDirection(), param.getStart(),param.getLimit()],(err,rows) => {
		  if(err){
				Logger.error(err);
				return next();
			}else{
				return rows;
			}
		 })
	}

	async queryAlarmCodeCount(param, next) {
		let sql = `select count(*) as total from alerts_codes where err_code =? and err_mesg =? and 'gmt_create' between ? and ? order by ? ? limit ?,?`;
	  return await db.queryArgs(sql, [param.getErrCode(), param.getErrMesg(), param.getStartTime(), param.getEndTime(),param.getOrderBy(), param.getDirection(), param.getStart(),param.getLimit()],(err,rows) => {
		  if(err){
				Logger.error(err);
				return next();
			}else{
				return rows[0].total;
			}
		 })
	}
}

module.exports = AlarmService;