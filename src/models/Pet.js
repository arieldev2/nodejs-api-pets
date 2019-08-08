const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const petSchema = new Schema({
    name: { type: String, required: true },
    breed: { type: String, required: true },
    color: { type: String, required: true },
    age: { type: Number, required: true },
    owner: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Pet', petSchema, 'pets');

