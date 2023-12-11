var express = require('express');
var router = express.Router();

const userCtrl = require('../controllers/user')

router.get('/', userCtrl.index)
router.put('/:id', userCtrl.updateAvatar)
router.put('/items/:id', userCtrl.updateUserItem)

module.exports = router;
