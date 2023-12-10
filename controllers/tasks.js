const User = require('../models/user')
const Skill = require('../models/skill')
const ToDoModels = require('../models/toDo'); 
const Goal = ToDoModels.Goal;
const Task = ToDoModels.Task;

module.exports = {
    index,
    new: newTask,
    create,
    show,
    edit,
    update,
    delete: deleteTask
}

async function deleteTask(req, res) {
    try {
        const taskId = req.params.id
        const deletedTask = await Task.findOneAndDelete({ _id: taskId})
        res.redirect('/tasks')
    } catch (err) {
        console.log('ERROR ~~>', err)
    }
}

async function update(req, res) {
    const user = req.user
    const taskId = req.params.id

    try {
        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId },
            { $set: req.body },
            { new: true }
        )
        if (updatedTask.status === 'Completed') {
            user.xp += updatedTask.xp
            const skillId = updatedTask.skill
            const skill = await Skill.findById(skillId)
            if (updatedTask.xp === 50) {
                skill.percentCompleted += 0.5
                const originalSkillXp = skill.xp
                if (skill.percentCompleted >= 100) {
                    skill.status = 'Completed'
                    if ( skill.status === 'Completed') {
                        user.xp += originalSkillXp
                    }
                }
                updatedTask.xp = 0;
                skill.xp = 0;
                await skill.save();
            }
        }
        await user.save()
        await updatedTask.save()
        res.redirect(`/tasks/${taskId}`)
    } catch (err) {
        console.log('ERROR ~~>', err)
        res.status(500).send('Internal Server Error')
    }
}

async function edit(req, res) {
    const task = await Task.findById(req.params.id).populate('skill goal')
    const skills = await Skill.find({})
    const goals = await Goal.find({})
    res.render('tasks/edit', {
        task,
        skills,
        goals,
        title: 'Edit Daily Task'
    })
}

async function show(req, res) {
    const task = await Task.findById(req.params.id).populate('skill goal')
    const skills = await Skill.find({ _id: { $in: task.skill }, user: req.user._id })
    const goals = await Skill.find({ _id: { $in: task.goal }, user: req.user._id })
    res.render('tasks/show', {
        goals,
        skills,
        task,
        title: 'Daily Task Details'
    })
}

async function create(req, res) {
    req.body.user = req.user._id
    try {
        await Task.create(req.body)
    } catch (err) {
        console.log('ERROR ~~>', err)
    }
    res.redirect('/tasks')
}

async function newTask(req, res) {
    try {
        const user = req.user
        const skills = await Skill.find({})
        const goals = await Goal.find({})
        res.render('tasks/new', {
            user,
            goals,
            skills,
            title: 'Add New Daily Task'
        });
    } catch (err) {
        console.error('ERROR ~~>', err)
    }
}

async function index(req, res) {
    const tasks = await Task.find({}).populate('skill goal')
    res.render('tasks/index', {
        tasks, 
        title: 'All Daily Tasks'
    })
}