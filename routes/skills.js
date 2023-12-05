var express = require('express');
var router = express.Router();

const skillsCtrl = require('../controllers/skills')

router.get('/', skillsCtrl.index)
router.get('/new', skillsCtrl.new)
router.post('/', skillsCtrl.create)
router.get('/:id', skillsCtrl.show)
router.get('/:id/edit', skillsCtrl.edit)
router.put('/:id', skillsCtrl.update)
router.delete('/:id', skillsCtrl.delete)

module.exports = router;