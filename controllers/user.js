const User = require('../models/user')
const Skill = require('../models/skill')
const ToDoModels = require('../models/toDo'); 
const Goal = ToDoModels.Goal;
const Task = ToDoModels.Task;

module.exports = {
    index,
    updateAvatar
}

async function index(req, res) {
    const skills = await Skill.find({ user: req.user._id })
    const goals = await Goal.find({ user: req.user._id }).populate('skill')
    const tasks = await Task.find({ user: req.user._id }).populate('skill goal')
    res.render('user/index', {
        skills,
        goals,
        tasks,
        title: 'Account Page'
    })
}

async function updateAvatar(req, res) {
    const selectedAvatar = req.body.radio
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id, 
            { avatar: selectedAvatar },
            { new: true }
        )
        res.redirect('/user')
    } catch (err) {
        console.log ('ERROR ~~>', err)
    }
}
