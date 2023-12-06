const Skill = require('../models/skill')

const ToDoModels = require('../models/toDo'); 
const Goal = ToDoModels.Goal;
const Task = ToDoModels.Task;

module.exports = {
    create,
}

async function create(req, res) {
    const skill = await Skill.findById(req.params.id);

    try {
        const { type, name, description, dueDate, priority } = req.body
        const goal = await Goal.create({
            type,
            name,
            description,
            dueDate,
            priority,
            skill: skill._id,
        })
        skill.goals.push(goal._id)
        await skill.save()

        console.log('Goal created successfully with Skill ID:', skill._id)
    } catch (err) {
        console.log('ERROR ~~>', err)
    }

    res.redirect(`/skills/${skill._id}`)
}