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
        type: Number,
        default: 0
    },
    coin: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);
module.exports = User;