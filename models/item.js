const mongoose = require('mongoose');
const Schema = mongoose.Schema;

itemSchema = new Schema({
    image: { type: String },
    name: { type: String },
    cost: { type: Number }
})

module.exports = mongoose.model('Item', itemSchema);