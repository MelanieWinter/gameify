const mongoose = require('mongoose');
const Schema = mongoose.Schema;

skillSchema = new Schema({
    skillName: { type: String },
    category: { type: String },
    hoursToCompletion: {
        type: String,
        default: 10000
    },
    description: { type: String },
    yourWhy: { type: String },
    xp: {
        type: Number,
        default: 100000
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high']
    },
    percentCompleted: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    completed: {
        type: Boolean,
        default: false,
        enum: [ true, false ]
    },
    goals: [{
        type: Schema.Types.ObjectId,
        ref: 'Goal'
    }]
})

module.exports = mongoose.model('Skill', skillSchema);