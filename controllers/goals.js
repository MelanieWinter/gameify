const User = require('../models/user')
const Skill = require('../models/skill')
const ToDoModels = require('../models/toDo');
const Goal = ToDoModels.Goal
const Task = ToDoModels.Task

module.exports = {
    create,
    index,
    new: newGoal,
    show,
    edit,
    update,
    delete: deleteGoal
}

async function deleteGoal(req, res) {
    try {
        const goalId = req.params.id
        const deletedGoal = await Goal.findOneAndDelete({ _id: goalId})
        res.redirect('/goals')
    } catch (err) {
        console.log('ERROR ~~>', err)
    }
}

async function update(req, res) {
    try {
        const goalId = req.params.id
        const updatedGoal = await Goal.findOneAndUpdate(
            { _id: goalId },
            { $set: req.body },
            { new: true }
        )
        res.redirect(`/goals/${goalId}`);
    } catch (err) {
        console.log('ERROR ~~>', err)
    }
}

async function edit(req, res) {
    const goal = await Goal.findById(req.params.id).populate('skill')
    const skills = await Skill.find({})
    const formattedDueDate = goal.dueDate ? goal.dueDate.toISOString().slice(0, 16) : '';
    res.render('goals/edit', {
        formattedDueDate,
        skills,
        goal,
        title: 'Edit Goal'
    })
}

async function show(req, res) {
    const goal = await Goal.findById(req.params.id).populate('skill')
    const skills = await Skill.find({ _id: { $in: goal.skill } })
    res.render('goals/show', {
        goal,
        title: 'Goal Details'
    })
}

async function newGoal(req, res) {
    try {
        const user = req.user
        const skills = await Skill.find({})
        res.render('goals/new', {
            user,
            skills,
            title: 'Add New Goal'
        });
    } catch (err) {
        console.error('ERROR ~~>', err)
    }
}

async function index(req, res) {
    const goals = await Goal.find({}).populate('skill')
    res.render('goals/index', {
        goals, 
        title: 'All Goals'
    })
}

async function create(req, res) {
    try {
        await Goal.create(req.body).populate('skill')
    } catch (err) {
        console.log('ERROR ~~>', err)
    }
    res.redirect('/goals')
}
