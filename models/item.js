const mongoose = require('mongoose')
const Schema = mongoose.Schema

itemSchema = new Schema({
    image: { type: String },
    name: { type: String },
    cost: { type: Number }
}, {
    timestamps: true
})

module.exports = mongoose.model('Item', itemSchema)