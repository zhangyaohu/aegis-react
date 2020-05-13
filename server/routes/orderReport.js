var express = require('express');
var router = express.Router();
const db = require('../mysql/dbConfig.js')

router.get('/list', async function(req, res) {
	var param = req.query, 
	sql = 'select * from sequencerpt where',
	sqlCount = 'select count(*) as total from sequencerpt where',
	sqlStr = '';
	direction = 'asc', orderBy= 'gmt_create', arg = [];
	if(param.service && param.service !== '') {
		sqlStr+=` and service='${param.service}'`
	}
	if(param.owner && param.owner !== '') {
		sqlStr+=` and owner='${param.owner}'`
	}
	if(param.table_name && param.table_name !== '') {
		sqlStr +=` and table_name='${param.table_name}'`
	}
	if(param.sequence && param.sequence !== '') {
		sqlStr +=` and sequence='${param.sequence}'`
	}
	if(param.starttime && param.endtime) {
		sqlStr+= ` and gmt_create between '${param.starttime}' and '${param.endtime}'`
	}
	if(param.sort) {
		direction	= param.sort.startsWith('-') ? 'asc' : 'desc';
		orderBy = param.sort.slice(1);
		sqlStr+=` order by '${orderBy}' ${direction}`
	 }
	 sql += sqlStr;
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
		console.log(JSON.stringify(rows));
		total = JSON.parse(JSON.stringify(rows))[0].total;
	})
	console.log(sql);
	db.query(sql, (err,rows) => {
   res.json({
		 status: 200,
		 error_code: 200,
		 data:JSON.parse(JSON.stringify(rows)),
		 total: total
	 })
	});
})

module.exports = router;