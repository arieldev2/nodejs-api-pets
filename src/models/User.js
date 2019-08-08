const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true, min: 6, max: 255 },
    email: { type: String, required: true, min: 6, max: 255 },
    password: { type: String, required: true, min: 6, max: 1024 },
    data: { type: Date, default: Date.now },
    pets: [{
        type: Schema.Types.ObjectId,
        ref: 'Pet'
    }]

});

module.exports = mongoose.model('User', userSchema, 'users');