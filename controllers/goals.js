const User = require('../models/user')
const Skill = require('../models/skill')
const ToDoModels = require('../models/toDo')
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
        const deletedGoal = await Goal.findOneAndDelete({ _id: goalId })
        res.redirect('/user')
    } catch (err) {
        console.log('ERROR ~~>', err)
    }
}

async function update(req, res) {
    const user = req.user
    const goalId = req.params.id

    try {
        const updatedGoal = await Goal.findOneAndUpdate(
            { _id: goalId },
            req.body,
            { new: true }
        )
        if (updatedGoal.status === 'Completed') {
            user.coin += updatedGoal.coin
            user.xp += updatedGoal.xp
            const skillId = updatedGoal.skill
            const skill = await Skill.findById(skillId)
            if (updatedGoal.xp === 50 && updatedGoal.skill) {
                skill.percentCompleted += 0.5
                const originalSkillXp = skill.xp
                if (skill.percentCompleted >= 100) {
                    skill.status = 'Completed'
                    if ( skill.status === 'Completed') {
                        user.xp += originalSkillXp
                        skill.xp = 0
                    }
                }
                await skill.save()
            }
            if (user.xp >= user.level * 50000) {
                user.level += 1
            }
            updatedGoal.coin = 0
            updatedGoal.xp = 0
        }
        await user.save()
        await updatedGoal.save()
        res.redirect(`/goals/${goalId}`)
    } catch (err) {
        console.log('ERROR ~~>', err)
    }
}

async function edit(req, res) {
    const goal = await Goal.findById(req.params.id).populate('skill')
    const skills = await Skill.find({ user: req.user._id })
    const formattedDueDate = goal.dueDate ? goal.dueDate.toISOString().slice(0, 16) : ''
    res.render('goals/edit', {
        formattedDueDate,
        skills,
        goal,
        title: 'Edit Goal'
    })
}

async function show(req, res) {
    const goal = await Goal.findById(req.params.id).populate('skill')
    const skills = await Skill.find({ _id: { $in: goal.skill }, user: req.user._id })
    res.render('goals/show', {
        goal,
        title: 'Goal Details'
    })
}

async function newGoal(req, res) {
    try {
        const user = req.user    
        const skills = await Skill.find({ user: req.user._id })
        res.render('goals/new', {
            user,
            skills,
            title: 'Add New Goal'
        })
    } catch (err) {
        console.error('ERROR ~~>', err)
    }
}

async function index(req, res) {
    const goals = await Goal.find({ user: req.user._id }).populate('skill')
    res.render('goals/index', {
        goals, 
        title: 'All Goals'
    })
}

async function create(req, res) {
    req.body.user = req.user._id
    try {
        await Goal.create(req.body).populate('skill')
    } catch (err) {
        console.log('ERROR ~~>', err)
    }
    res.redirect('/user')
}


