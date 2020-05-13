var express = require('express');
var router = express.Router();
const db = require('../mysql/dbConfig.js')
const DataDictionaryController = require('../controller/dataDictionaryController');
const dataDictionaryController = new DataDictionaryController();

router.get('/list', async function(req, res) {
	var param = req.query, 
	sql = 'select * from dicttables where',
	sqlCount = 'select count(*) as total from dicttables where',
	sqlStr = '';
	direction = 'asc', orderBy= 'gmt_create', arg = [];
	if(param.service && param.service !== '') {
		sqlStr+=` and SERVICE='${param.service}'`
	}
	if(param.owner && param.owner !== '') {
		sqlStr+=` and Owner='${param.owner}'`
	}
	if(param.table_name && param.table_name !== '') {
		sqlStr +=` and TABLE_NAME='${param.table_name}'`
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

router.get('/column/list', async function(req, res, next) {
  return await dataDictionaryController.columnController(req, res, next);
})

router.get('/index/list', async function(req, res, next) {
	return await dataDictionaryController.indexController(req, res, next);
})
module.exports = router;