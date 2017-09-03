/**
 * Created by heavenduke on 17-9-3.
 */

exports.create = async (ctx, next) => {
    let User = global.database.models.user;
    if (ctx.request.body.password == ctx.request.body.confirmPassword) {
        let user = await new User({
            username: ctx.request.body.username,
            email: ctx.request.body.email,
            encryptedPassword: User.generatePassword(ctx.request.body.password),
            session: {}
        });
        await user.save();
        ctx.body = global.response.success(200, "success", {
            username: user.username,
            email: user.email,
            session: user.session
        });
    }
    else {
        ctx.body = global.response.error(400, "invalid data");
    }
};

exports.show = async (ctx, next) => {
    ctx.body = global.response.success(200, "success", {
        username: ctx.current_user.username,
        email: ctx.current_user.email
    });
};

exports.update = async (ctx, next) => {
    if (ctx.request.body.email) {
        ctx.current_user.email = ctx.request.body.email;
    }
    if (ctx.request.body.username) {
        ctx.current_user.username = ctx.request.body.username;
    }
    if (ctx.request.body.password) {
        if (ctx.current_user.verifyPassword(ctx.request.body.password)) {
            if (ctx.request.body.newPassword == ctx.request.body.confirmPassword) {
                ctx.current_user.encryptedPassword = User.generatePassword(ctx.request.body.newPassword);
            }
            else {
                ctx.body = global.response.error(401, "unmatch password");
            }
        }
        else {
            ctx.body = global.response.error(401, "wrong password");
        }
    }

    await ctx.current_user.save();
    ctx.body = global.response.success(200, "sucecss", {
        username: ctx.current_user.username,
        email: ctx.current_user.email
    });
};


exports.sessions = require('./sessions');