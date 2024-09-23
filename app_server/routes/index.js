var express = require('express');
var router = express.Router();
const controllerMain = require('../controllers/main');

/* GET home page. */
router.get('/', controllerMain.index);

module.exports = router;
