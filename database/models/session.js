/**
 * Created by heavenduke on 17-9-3.
 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Session = new Schema({
    expiresAt: {
        type: Number,
        required: true,
        default: 60 * 60 * 24 * 1000
    },
    refreshableAt: {
        type: Number,
        required: true,
        default: 60 * 60 * 24 * 7 * 1000
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = Session;