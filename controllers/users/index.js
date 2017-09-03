/**
 * Created by heavenduke on 17-9-3.
 */

exports.create = async (ctx, next) => {
    let User = global.database.models.user;
    if (ctx.request.body.password == ctx.request.body.confirmPassword) {
        let user = await new User({
            username: ctx.request.body.username,
            email: ctx.request.body.email,
            password: ctx.request.body.password,
        });
        ctx.body = global.response.success(200, "success", {
            username: user.username,
            email: user.email
        });
    }
    else {
        ctx.body = global.response.error(400, "invalid data");
    }
};

exports.show = async (ctx, next) => {

};

exports.update = async (ctx, next) => {

};


exports.sessions = require('./sessions');