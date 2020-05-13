var express = require('express');
var router = express.Router();
const AlarmController = require('../controller/alarmController.js');

const alarmController = new AlarmController();

router.get('/list', function(req, res, next) {
	return alarmController.alarmListController(req, res, next);
})


router.get('/alert-code/list', async function(req, res, next) {
	return alarmController.alarmCodeListController(req, res, next);
})

module.exports = router;