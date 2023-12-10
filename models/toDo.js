const mongoose = require('mongoose')
const Schema = mongoose.Schema

const toDoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    skill: {
        type: Schema.Types.ObjectId,
        ref: 'Skill'
    },
    goal: {
        type: Schema.Types.ObjectId,
        ref: 'Goal'
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    },
    type: {
        type: String,
        enum: ['goal', 'dailyTask']
    },
    name: { 
        type: String,
        required: true
    },
    description: { type: String },
    xp: { 
        type: Number,
        default: 50
    },
    // dateCreated: { 
    //     type: Date,
    //     default: Date.now 
    // },
    dueDate: { 
        type: Date
    },
    priority: {
        type: String,
        enum: [ 'high', 'medium', 'low' ]
    },
    status: {
        type: String,
        default: 'In Progress',
        enum: [ 'In Progress', 'Completed' ]
    }
})

const Goal = mongoose.model('Goal', toDoSchema);
module.exports.Goal = Goal;


const Task = mongoose.model('Task', toDoSchema);
module.exports.Task = Task;