/**
 * Created by heavenduke on 17-8-29.
 */

let mongoose = require('mongoose');
let loader = {
    models: {}
};

let User = require('./models/user');

mongoose.Promise = global.Promise;

loader.models.user = mongoose.model('user', User);

module.exports = {
    loader
};