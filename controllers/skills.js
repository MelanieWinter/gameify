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
        const deletedSkill = await Skill.findOneAndDelete({ _id: skillId})
        res.redirect('/skills')
    } catch (err) {
        console.log('ERROR ~~>', err)
        res.render('skills/delete', { errorMsg: err.message})
    }
}

async function update(req, res) {
    try {
        const skillId = req.params.id
        const updatedSkill = await Skill.findOneAndUpdate(
            { _id: skillId },
            { $set: req.body },
            { new: true }
        )
        res.redirect('/skills');
    } catch (err) {
        console.log('ERROR ~~>', err)
        res.render(`/skills/${skill._id}`, { errorMsg: err.message })
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
    const skill = await Skill.findById(req.params.id).populate('goals')
    res.render('skills/show', {
        skill,
        title: 'Skill Details'
    })
}

async function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key]
    }
    try {
        const skill = await Skill.create(req.body)
        res.redirect('/skills')
    } catch (err) {
        console.log('ERROR ~~>', err)
        res.render('skills/new', { errorMsg: err.message})
    }
}

function newSkill(req, res) {
    const newSkill = new Skill()
    res.render('skills/new', {
        errorMsg: '',
        title: 'New Skill'
    })
}

async function index(req, res) {
    const skills = await Skill.find({})
    res.render('skills/index', {
        skills, 
        title: 'All Skills'
    })
}