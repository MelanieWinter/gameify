const Goal = require('../models/toDo')
const Skill = require('../models/skill')

module.exports = {
    create,
}

async function create(req, res) {
    const skill = await Skill.findById(req.params.id)
    try {
        await Goal.create({ ...req.body, skill: skill._id})
    } catch (err) {
        console.log('ERROR ~~>', err)
    }
    res.redirect(`/skills/${skill._id}`)
}