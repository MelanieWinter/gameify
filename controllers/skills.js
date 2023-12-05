const Skill = require('../models/skill')

module.exports = {
    index,
    new: newSkill,
    create,
    show
}

async function show(req, res) {
    const skill = await Skill.findById(req.params.id)
    console.log()
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