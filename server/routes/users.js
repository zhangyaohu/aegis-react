var express = require('express');
var router = express.Router();
const db = require('../mysql/dbConfig.js')
const UserController = require('../controller/usersController.js');

const userController = new UserController();
/* GET users listing. */
router.get('/list', async function (req, res, next) {
  return await userController.userListController(req, res, next);
});

router.get('/role/list', async function (req, res, next) {
  return await userController.userRoleListController(req, res, next);
});

router.get('/roles/list', async function (req, res, next) {
  return await userController.userRolesListController(req, res, next);
});


router.get('/rank/list', async function (req, res, next) {
  return await userController.userRankListController(req, res, next);
});

module.exports = router;
