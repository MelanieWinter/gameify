const User = require('../models/user')
const Skill = require('../models/skill')
const ToDoModels = require('../models/toDo'); 
const Goal = ToDoModels.Goal;
const Task = ToDoModels.Task;

module.exports = {
    index,
    new: newSkill,
    create,
    show,
    edit,
    update,
    delete: deleteSkill
}

async function deleteSkill(req, res) {
    try {
        const skillId = req.params.id
        await Goal.deleteMany({ skill: skillId })
        await Task.deleteMany({ skill: skillId })
        const deletedSkill = await Skill.findOneAndDelete({ _id: skillId})
        res.redirect('/user')
    } catch (err) {
        console.log('ERROR ~~>', err)
        res.render('skills/delete', { errorMsg: err.message})
    }
}

async function update(req, res) {
    const user = req.user;
    try {
        const skillId = req.params.id;
        const updatedSkill = await Skill.findOneAndUpdate(
            { _id: skillId },
            { $set: req.body },
            { new: true }
        );
        if (updatedSkill.status === 'Completed') {
            user.coin += 200;
            user.xp += updatedSkill.xp;
            updatedSkill.percentCompleted = 100;
            updatedSkill.xp = 0;
            if (user.xp >= user.level * 50000) {
                user.level += 1;
            }
            await user.save();
            await updatedSkill.save();
            res.redirect(`/skills/${skillId}`);
        }
    } catch (err) {
        console.log('ERROR ~~>', err);
        res.render(`/skills/${skill._id}`, { errorMsg: err.message });
    }
}

async function edit(req, res) {
    const skill = await Skill.findById(req.params.id)
    res.render('skills/edit', {
        skill,
        title: 'Edit  Skill'
    })
}

async function show(req, res) {
    const skill = await Skill.findById(req.params.id)
    const goals = await Goal.find({ skill: skill._id, user: req.user._id })
    const tasks = await Task.find({ skill: skill._id, user: req.user._id})
    res.render('skills/show', {
        tasks,
        goals,
        skill,
        title: 'Skill Details'
    })
}


async function create(req, res) {
    req.body.user = req.user._id
    try {
        console.log(req.body)
        await Skill.create(req.body)
    } catch (err) {
        console.log('ERROR ~~>', err)
        res.render('skills/new', { errorMsg: err.message })
    }
    res.redirect('/user')
}

async function newSkill(req, res) {
    res.render('skills/new', {
        errorMsg: '',
        title: 'New Skill'
    })
}

async function index(req, res) {
    const skills = await Skill.find({ user: req.user._id })
    res.render('skills/index', {
        skills, 
        title: 'All Skills'
    })
}
