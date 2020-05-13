var express = require('express');
var router = express.Router();
const db = require('../mysql/dbConfig.js')
const { formatDateTime,encyptPwd, decyptPwd } = require('../utils');

router.post('/login', async function (req, res) {
	var { name, password } = { ...req.body };
	var sql = `select * from users where username='${name}'`;
	res.setHeader('Access-Control-Allow-Origin', '*');
	db.query(sql, (err, rows) => {
		let userinfo =  JSON.parse(JSON.stringify(rows))[0]
		 if(!userinfo) {
			res.status(200).send({
				"code": 200,
				"message": '该用户还没有注册!'
			});
		 }else if (!err) {
			if (userinfo && userinfo == null) {
				res.status(200).send({
					"code": 200,
					"message": '该用户还没有注册!'
				});
			} else {
				if (decyptPwd('aegis',userinfo.password) === password) {//将输入的密码与密文进行比对
					req.session.sid = name;
					res.status(200).send({
						"code": 200,
						"message": "登录成功!"
					});
				} else {
					res.status(400).send({
						"code": 400,
						"message": "用户名或者密码错误!"
					});
				}
			}
		} else
			res.json({ status: 200, code: 400, data: '参数不对' });
	})
})

router.post('/modifyUser', async function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	try {
		let sql = `update  users set username = '${req.body.username}',
																		 mail='${req.body.mail}', 
																		 ww='${req.body.ww}', 
																		 mobile='${req.body.mobile}',
																		 role='${req.body.role}',
																		super='${req.body.super}', 
																		page_rows='${req.body.page_rows}',
																		gmt_modified='${formatDateTime(new Date().getTime(), 'yyyy-MM-dd hh:mm:ss')}' where id=${req.body.id}`
		await db.query(sql, (err, rows) => {
			if (!err)
				res.json({ status: 200, code: 200, data: '修改成功' });
			else
				res.json({ status: 200, code: 400, data: '参数不对' });
		});
	} catch (err) {
		next(err)
	}
})

router.post('/modifyPwd', async function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	try {
		var hash = encyptPwd('aegis', req.body.password);
		let sql = `update  users set password = '${hash}',
																		gmt_modified='${formatDateTime(new Date().getTime(), 'yyyy-MM-dd hh:mm:ss')}' where username='${req.body.username}'`;
																		console.log(sql);
		await db.query(sql, (err, rows) => {
			if (!err)
				res.json({ status: 200, code: 200, data: '修改成功' });
			else
				res.json({ status: 200, code: 400, data: '参数不对' });
		});
	} catch (err) {
		next(err)
	}
})

module.exports = router;