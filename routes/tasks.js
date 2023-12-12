var express = require('express')
var router = express.Router()

const tasksCtrl = require('../controllers/tasks')

router.get('/', tasksCtrl.index)
router.get('/new', tasksCtrl.new)
router.post('/', tasksCtrl.create)
router.get('/:id', tasksCtrl.show)
router.get('/:id/edit', tasksCtrl.edit)
router.put('/:id', tasksCtrl.update)
router.delete('/:id', tasksCtrl.delete)

module.exports = router