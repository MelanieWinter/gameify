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
    try {
        // Assuming the selected item's value is sent in the request body
        const selectedItem = req.body.radio;
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id, 
            { $push: { items: selectedItem } },
            { new: true }
        )
        res.redirect('/user')
        
    } catch (error) {
        console.error('Error updating user items:', error);
        // Handle the error or render an error page
        res.status(500).send('Internal Server Error');
    }
};
