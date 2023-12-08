const mongoose = require('mongoose');
const Schema = mongoose.Schema;

skillSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    skillName: { type: String, required: true },
    category: { type: String },
    description: { type: String },
    yourWhy: { type: String },
    xp: {
        type: Number,
        default: 10000
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
    status: {
        type: String,
        default: 'In Progress',
        enum: [ 'In Progress', 'Completed' ]
    }
})

module.exports = mongoose.model('Skill', skillSchema);