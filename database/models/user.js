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

User.virtual('password').
    get(() => {
        return {
            randStr: this.encryptedPassword.split("$")[1],
            encrypted: this.encryptedPassword.split("$")[2]
        };
    }).
    set((value) => {
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

        this.encryptedPassword = md5.digest(`md5$${randStr}$${md5.digest(`${value}${randStr}`)}`);
    });

User.methods = {
    verifyPassword: (password)=> {
        let md5 = crypto.createHash('md5');
        return md5.digest(`${password}${this.password.randStr}`) == this.password.encrypted;
    }
};

module.exports = User;