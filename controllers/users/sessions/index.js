/**
 * Created by heavenduke on 17-9-3.
 */

exports.create = async (ctx, next) => {
    let User = global.database.models.user;
    let user = await new User({
        email: ctx.request.body.email
    });
    if (user && user.verifyPassword(ctx.requst.body.password)) {
        user.session = await User.session.create({});
        await user.save();
        ctx.body = global.response.success(200, "success", {
            username: user.username,
            email: user.email,
            session: user.session
        });
    }
    else {
        ctx.body = global.response.error(401, "Incorrect Password");
    }
};

exports.update = async (ctx, next) => {
    let User = global.database.models.user;
    let user = await new User({
        email: ctx.request.body.email,
        session: {
            _id: ctx.request.body.access_token
        }
    });
    if (user && user.session.createdAt + user.session.refreshableAt > Date.now()) {
        user.session = await User.session.create({});
        await user.save();
        ctx.body = global.response.success(200, "success", {
            username: user.username,
            email: user.email,
            session: user.session
        });
    }
    else {
        ctx.body = global.response.error(401, "Incorrect Access Token");
    }
};