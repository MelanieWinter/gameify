var express = require('express');
var router = express.Router();

const goalsCtrl = require('../controllers/goals')

router.post('/skills/:id/goals', goalsCtrl.create)

module.exports = router;