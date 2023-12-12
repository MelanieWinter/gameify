var express = require('express')
var router = express.Router()

const itemsCtrl = require('../controllers/items')

router.get('/', itemsCtrl.index)

module.exports = router