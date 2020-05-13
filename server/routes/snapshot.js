var express = require('express');
var router = express.Router();
const db = require('../mysql/dbConfig.js')

router.get('/list', async function(req, res) {
	var param = req.query, 
	sql = 'select * from snapshot where',
	sqlCount = 'select count(*) as total from snapshot where',
	direction = 'asc',
	 orderBy= 'gmt_create', 
	 sqlStr = '';
	 arg = [];
	if(param.id && param.id !== '') {
		sqlStr+=` and id='${param.id}'`
	}
	if(param.service && param.service !== '') {
		sqlStr+=` and service='${param.service}'`
	}
	if(param.owner && param.owner !== ''){
    sqlStr +=` and owner='${param.owner}'`
	}
	if(param.report_name && param.report_name) {
		sqlStr+= `  and report_name='${param.report_name}'`
	}
	if(param.starttime && param.endtime) {
		sqlStr+= ` and gmt_create between '${param.starttime}' and '${param.endtime}'`
	}
	if(param.sort) {
		direction	= param.sort.startsWith('-') ? 'asc' : 'desc';
		orderBy = param.sort.slice(1);
		sqlStr +=` order by '${orderBy}' ${direction}`
	 }
	 sql +=sqlStr;
	 sqlCount += sqlStr;
	 if(param.start && param.limit) {
		sql+=` limit  ${param.start},  ${param.limit}`
	 }
	if(sql.indexOf('and') === -1) {
		sql = sql.replace('where', '');
	}else {
	  sql = sql.replace('and', (it) => {
      return ''
		})
	}
	if(sqlCount.indexOf('and') === -1) {
		sqlCount = sqlCount.replace('where', '');
	}else {
	  sqlCount = sqlCount.replace('and', (it) => {
      return ''
		})
	}
	var total = 0;
	await db.query(sqlCount,(err,rows) => {
		total = JSON.parse(JSON.stringify(rows))[0].total;
	})
	db.query(sql, (err,rows) => {
   res.json({
		 status: 200,
		 error_code: 200,
		 data: JSON.parse(JSON.stringify(rows)),
		 total: total
	 })
	});
})

module.exports = router;