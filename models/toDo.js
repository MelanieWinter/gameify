const mongoose = require('mongoose')
const Schema = mongoose.Schema

const toDoSchema = new Schema({
    skill: {
        type: Schema.Types.ObjectId,
        ref: 'Skill'
    },
    task: {
        type: Schema.Types.ObjectId,
        res: 'Task'
    },
    type: {
        type: String,
        enum: ['longTermGoal', 'shortTermGoal', 'dailyTask']
    },
    name: { type: String },
    description: { type: String },
    xp: { type: Number },
    dateCreated: { 
        type: Date,
        default: Date.now 
    },
    dueDate: { 
        type: Date,
        default: function() {
            const oneMonthLater = new Date(this.dateCreated)
            oneMonthLater.setMonth(oneMonthLater.getMonth() + 1)
            return oneMonthLater
        }
    },
    priority: {
        type: String,
        enum: [ 'high', 'normal', 'low' ]
    },
    completed: {
        type: Boolean,
        default: false,
        enum: [ true, false ]
    }
})

const Goal = mongoose.model('Goal', toDoSchema);
module.exports.Goal = Goal;


const Task = mongoose.model('Task', toDoSchema);
module.exports.Task = Task;