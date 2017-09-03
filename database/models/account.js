/**
 * Created by heavenduke on 17-8-29.
 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Account = new Schema({
    budget: {
        type: Number,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    explanation: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

module.exports = Account;