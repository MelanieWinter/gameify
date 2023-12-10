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
        res.redirect('/user')
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
            user.coin += 10
            user.xp += updatedTask.xp
            const skillId = updatedTask.skill
            const skill = await Skill.findById(skillId)
            if (updatedTask.xp === 50 && updatedTask.skill) {
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
            if (user.xp >= user.level * 50000) {
                user.level += 1;
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
    const skills = await Skill.find({ user: req.user._id })
    const goals = await Goal.find({ user: req.user._id })
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
    res.redirect('/user')
}

async function newTask(req, res) {
    try {
        const user = req.user
        const skills = await Skill.find({ user: req.user._id })
        const goals = await Goal.find({ user: req.user._id })
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
    const tasks = await Task.find({ user: req.user._id }).populate('skill goal')
    res.render('tasks/index', {
        tasks, 
        title: 'All Daily Tasks'
    })
}

async function resetDailyTasks() {
    try {
        await Task.updateMany({ status: 'Completed' }, { $set: { status: 'In Progress' } })
        await Task.updateMany({}, { $set: { xp: 50 } })
    } catch (err) {
    console.error('Error resetting tasks:', err)
    }
}

function scheduleReset() {
    let reset = new Date()
    reset.setHours(24, 0, 0, 0)
    let t = reset.getTime() - Date.now()
    setTimeout(function() {
        resetDailyTasks()
        scheduleReset()
    }, t)
}

scheduleReset()

// async function resetDailyTasks() {
//     try {
//         await Task.updateMany({ status: 'Completed' }, { $set: { status: 'In Progress' } });
//         await Task.updateMany({}, { $set: { xp: 50 } });
//         console.log('Tasks reset successfully.');
//     } catch (err) {
//         console.error('Error resetting tasks:', err);
//     }
// }

// function scheduleReset() {
//     // get current time
//     let reset = new Date();
//     // update the Hours, mins, secs to the 24th hour (which is when the next day starts)
//     reset.setHours(24, 0, 0, 0);
//     // calc amount of time until restart
//     let t = reset.getTime() - Date.now();
    
//     // Call resetDailyTasks immediately
//     resetDailyTasks();

//     // Schedule the next reset
//     setTimeout(function() {
//         scheduleReset();
//     }, t);
// }

// // Initial call to scheduleReset
// scheduleReset();