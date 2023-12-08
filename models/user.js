const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    googleId: {
        type: String,
        required: true
    },
    email: String,
    avatar: String,
    xp: {
        type: String,
        default: 0
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
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);