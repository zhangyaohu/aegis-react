var express = require('express');
var router = express.Router();
const db = require('../mysql/dbConfig.js')

router.get('/dispbyh', async function(req, res) {
	var param = req.query, 
	sql = 'select * from templates_hosts where';
	let direction = 'asc', orderBy= 'gmt_create', arg = [];
	if(param.service && param.service !== '') {
		sql += ` and service='${param.service}'`
	}
	if(param.tags && param.tags !== '') {
		sql+=` and tags like '%${param.tags}%'`
	}
	if(param.type && param.type !== '') {
		sql+=` and type='%${param.type}%'`
	}
	if(param.search && param.search !== '')
	 sql+=` and concat(name, sname, type, tags) like '%${param.search}%'`;
	if(param.starttime && param.endtime) {
		sql+= ` and gmt_modified between '${param.starttime}' and '${param.endtime}'`
	}
	if(sql.indexOf('and') === -1) {
		sql = sql.replace('where', '');
	}else {
	  sql = sql.replace('and', (it) => {
      return ''
		})
	}
	if(param.sort) {
		direction	= param.sort.startsWith('-') ? 'asc' : 'desc';
		orderBy = param.sort.slice(1);
		sql+=` order by '${orderBy}' ${direction}`
	 }
	var total = 0;
	await db.query(`select count(*) as total from templates_hosts where  concat(name, sname, type, tags) like '%${param.type ? param.type : ''}%'`,(err,rows) => {
		total = JSON.parse(JSON.stringify(rows))[0].total;
	})
	db.query(sql, (err,rows) => {
		console.log(rows);
   res.json({
		 status: 200,
		 error_code: 200,
		 data: JSON.parse(JSON.stringify(rows)),
		 total: total
	 })
	});
})

module.exports = router;