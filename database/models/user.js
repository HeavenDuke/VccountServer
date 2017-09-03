/**
 * Created by heavenduke on 17-8-29.
 */

let crypto = require('crypto');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    },
    encryptedPassword: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    accounts: [require('./account')],
    session: require('./session')
}, {collection: 'Users'});

User.methods.verifyPassword = function (password) {
    let md5 = crypto.createHash('md5');
    let data = {
        randStr: this.encryptedPassword.split("$")[1],
        encrypted: this.encryptedPassword.split("$")[2],
    };
    md5.update(`${password}${data.randStr}`);
    return md5.digest('hex') == data.encrypted;
};

User.statics = {
    generatePassword: (value) => {
        let md5 = crypto.createHash('md5');
        let randStrGenerator = (len) => {
            let rand_int = (min, max) => {
                return Math.round(min + Math.random() * (max - min));
            };
            const alphabet = '1234567890QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
            let result = [];
            for(let i = 0; i < len; i++) {
                result.push(alphabet.charAt(rand_int(0, alphabet.length - 1)));
            }
            return result.join('');
        };
        let randStr = randStrGenerator(6);

        md5.update(`${value}${randStr}`);
        return `md5$${randStr}$${md5.digest('hex')}`;
    }
};

module.exports = User;