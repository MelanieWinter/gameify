var express = require('express')
var router = express.Router()

const goalsCtrl = require('../controllers/goals')

router.post('/', goalsCtrl.create)
router.get('/', goalsCtrl.index)
router.get('/new', goalsCtrl.new)
router.get('/:id', goalsCtrl.show)
router.get('/:id/edit', goalsCtrl.edit)
router.put('/:id', goalsCtrl.update)
router.delete('/:id', goalsCtrl.delete)

module.exports = router