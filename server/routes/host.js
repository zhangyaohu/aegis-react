var express = require('express');
var router = express.Router();
const db = require('../mysql/dbConfig.js')
router.get('/list',async function (req, res, next) {
  var param = req.query,
    sql = 'select * from hosts where',
    sqlCount = 'select count(*) as total from hosts where',
    direction = 'asc',
    orderBy = 'gmt_create',
    sqlStr = '';
  arg = [];
  if (param.id && param.id !== '') {
    sqlStr += ` and id='${param.id}'`
  }
  if (param.name && param.name !== '') {
    sqlStr += ` and name='${param.name}'`
  }
  if (param.db_name && param.db_name !== '') {
    sqlStr += ` and db_name='${param.db_name}'`
  }
  if (param.roles && param.roles) {
    sqlStr += `  and roles='${param.roles}'`
  }
  if (param.starttime && param.endtime) {
    sqlStr += ` and gmt_create between '${param.starttime}' and '${param.endtime}'`
  }
  if (param.sort) {
    direction = param.sort.startsWith('-') ? 'asc' : 'desc';
    orderBy = param.sort.slice(1);
    sqlStr += ` order by '${orderBy}' ${direction}`
  }
  sql += sqlStr;
  sqlCount += sqlStr;
  if(param.start && param.limit) {
		sql+=` limit  ${param.start},  ${param.limit}`
	 }
  if (sql.indexOf('and') === -1) {
    sql = sql.replace('where', '');
  } else {
    sql = sql.replace('and', (it) => {
      return ''
    })
  }
  if (sqlCount.indexOf('and') === -1) {
    sqlCount = sqlCount.replace('where', '');
  } else {
    sqlCount = sqlCount.replace('and', (it) => {
      return ''
    })
  }
  var total = 0;
  await db.query(sqlCount, (err, rows) => {
    total = JSON.parse(JSON.stringify(rows))[0].total;
  })
  db.query(sql, (err, rows) => {
    res.json({
      status: 200,
      error_code: 200,
      data: JSON.parse(JSON.stringify(rows)),
      total: total
    })
  });
});

router.get('/host-group/list', async function (req, res, next) {
  var param = req.query,
    sql = 'select * from hosts_groups where',
    sqlCount = 'select count(*) as total from hosts_groups where',
    direction = 'asc',
    orderBy = 'gmt_create',
    sqlStr = '';
  arg = [];
  if (param.id && param.id !== '') {
    sqlStr += ` and id='${param.id}'`
  }
  if (param.name && param.name !== '') {
    sqlStr += ` and name='${param.name}'`
  }
  if (param.db_name && param.db_name !== '') {
    sqlStr += ` and db_name='${param.db_name}'`
  }
  if (param.roles && param.roles) {
    sqlStr += `  and roles='${param.roles}'`
  }
  if (param.starttime && param.endtime) {
    sqlStr += ` and gmt_create between '${param.starttime}' and '${param.endtime}'`
  }
  if (param.sort) {
    direction = param.sort.startsWith('-') ? 'asc' : 'desc';
    orderBy = param.sort.slice(1);
    sqlStr += ` order by '${orderBy}' ${direction}`
  }
  sql += sqlStr;
  sqlCount += sqlStr;
  if(param.start && param.limit) {
		sql+=` limit  ${param.start},  ${param.limit}`
	 }
  if (sql.indexOf('and') === -1) {
    sql = sql.replace('where', '');
  } else {
    sql = sql.replace('and', (it) => {
      return ''
    })
  }
  if (sqlCount.indexOf('and') === -1) {
    sqlCount = sqlCount.replace('where', '');
  } else {
    sqlCount = sqlCount.replace('and', (it) => {
      return ''
    })
  }
  var total = 0;
  await db.query(sqlCount, (err, rows) => {
    total = JSON.parse(JSON.stringify(rows))[0].total;
  })
  db.query(sql, (err, rows) => {
    res.json({
      status: 200,
      error_code: 200,
      data: JSON.parse(JSON.stringify(rows)),
      total: total
    })
  });
});


router.get('/template/list', async function (req, res, next) {
  var param = req.query,
    sql = 'select * from templates_hosts where',
    sqlCount = 'select count(*) as total from templates_hosts where',
    direction = 'asc',
    orderBy = 'gmt_create',
    sqlStr = '';
  arg = [];
  if (param.id && param.id !== '') {
    sqlStr += ` and id='${param.id}'`
  }
  if (param.host_name && param.host_name !== '') {
    sqlStr += ` and host_name='${param.host_name}'`
  }
  if (param.name && param.name !== '') {
    sqlStr += ` and name='${param.name}'`
  }
  if (param.sname && param.sname) {
    sqlStr += `  and sname='${param.sname}'`
  }
  if (param.starttime && param.endtime) {
    sqlStr += ` and gmt_create between '${param.starttime}' and '${param.endtime}'`
  }
  if (param.sort) {
    direction = param.sort.startsWith('-') ? 'asc' : 'desc';
    orderBy = param.sort.slice(1);
    sqlStr += ` order by '${orderBy}' ${direction}`
  }
  sql += sqlStr;
  sqlCount += sqlStr;
  if(param.start && param.limit) {
		sql+=` limit  ${param.start},  ${param.limit}`
	 }
  if (sql.indexOf('and') === -1) {
    sql = sql.replace('where', '');
  } else {
    sql = sql.replace('and', (it) => {
      return ''
    })
  }
  if (sqlCount.indexOf('and') === -1) {
    sqlCount = sqlCount.replace('where', '');
  } else {
    sqlCount = sqlCount.replace('and', (it) => {
      return ''
    })
  }
  var total = 0;
  await db.query(sqlCount, (err, rows) => {
    total = JSON.parse(JSON.stringify(rows))[0].total;
  })
  db.query(sql, (err, rows) => {
    res.json({
      status: 200,
      error_code: 200,
      data: JSON.parse(JSON.stringify(rows)),
      total: total
    })
  });
});


router.get('/detail/list', async function (req, res, next) {
  var param = req.query,
    sql = 'select * from hosts_groups_detail where',
    sqlCount = 'select count(*) as total from hosts_groups_detail where',
    direction = 'asc',
    orderBy = 'gmt_create',
    sqlStr = '';
  arg = [];
  if (param.id && param.id !== '') {
    sqlStr += ` and id='${param.id}'`
  }
  if (param.host_name && param.host_name !== '') {
    sqlStr += ` and host_name='${param.host_name}'`
  }
  if(param.group_id && param.group_id !== '') {
    sqlStr += ` and group_id='${param.group_id}'`
  }
  if (param.group_name && param.group_name !== '') {
    sqlStr += ` and group_name='${param.group_name}'`
  }
  if (param.starttime && param.endtime) {
    sqlStr += ` and gmt_create between '${param.starttime}' and '${param.endtime}'`
  }
  if (param.sort) {
    direction = param.sort.startsWith('-') ? 'asc' : 'desc';
    orderBy = param.sort.slice(1);
    sqlStr += ` order by '${orderBy}' ${direction}`
  }
  sql += sqlStr;
  sqlCount += sqlStr;
  if(param.start && param.limit) {
		sql+=` limit  ${param.start},  ${param.limit}`
	 }
  if (sql.indexOf('and') === -1) {
    sql = sql.replace('where', '');
  } else {
    sql = sql.replace('and', (it) => {
      return ''
    })
  }
  if (sqlCount.indexOf('and') === -1) {
    sqlCount = sqlCount.replace('where', '');
  } else {
    sqlCount = sqlCount.replace('and', (it) => {
      return ''
    })
  }
  var total = 0;
  await db.query(sqlCount, (err, rows) => {
    total = JSON.parse(JSON.stringify(rows))[0].total;
  })
  db.query(sql, (err, rows) => {
    res.json({
      status: 200,
      error_code: 200,
      data: JSON.parse(JSON.stringify(rows)),
      total: total
    })
  });
});

module.exports = router;