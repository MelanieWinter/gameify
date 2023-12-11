const User = require('../models/user')
const Skill = require('../models/skill')
const ToDoModels = require('../models/toDo'); 
const Goal = ToDoModels.Goal;
const Task = ToDoModels.Task;
const Item = require('../models/item')

module.exports = {
    index,
    updateAvatar,
    updateUserItem
}

async function index(req, res) {
    const skills = await Skill.find({ user: req.user._id })
    const goals = await Goal.find({ user: req.user._id }).populate('skill')
    const tasks = await Task.find({ user: req.user._id }).populate('skill goal')
    const items = await Item.find({})
    res.render('user/index', {
        items,
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

async function updateUserItem(req, res) {
    console.log(req.body.radio)
    console.log(req.user._id)
    try {
        const selectedItem = req.body.radio;
        const user = await User.findById(req.user._id)
        user.items.push(selectedItem)
        await user.save()
        res.redirect('/user')
        
    } catch (error) {
        console.error('Error updating user items:', error);
        res.status(500).send('Internal Server Error');
    }
}
