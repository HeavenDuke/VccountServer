/**
 * Created by heavenduke on 17-9-3.
 */

exports.guest_only = async (ctx, next) => {
    let User = global.database.models.user;
    let user = await User.findOne({
        'session._id': ctx.request.body.access_token ? ctx.request.body.access_token : ctx.query.access_token,
    });
    if (user && Date.parse(user.session.createdAt) + user.session.expiresAt > Date.now()) {
        ctx.body = global.response.error(401, "you have already signed in!");
    }
    else {
        await next();
    }
};

exports.user_only = async (ctx, next) => {
    let User = global.database.models.user;
    let user = await User.findOne({
        'session._id': ctx.request.body.access_token ? ctx.request.body.access_token : ctx.query.access_token,
    });
    if (!user || Date.parse(user.session.createdAt) + user.session.expiresAt < Date.now()) {
        ctx.body = global.response.error(401, "you haven't signed in!");
    }
    else {
        ctx.current_user = user;
        await next();
    }
};

exports.owner_only = async (ctx, next) => {
    let User = global.database.models.user;
    let user = await User.findOne({
        session: {
            _id: ctx.request.body.access_token,
        }
    });
    if (!user || user.session.createdAt + user.session.expiresAt > Date.now()) {
        ctx.body = global.error(401, "you have already signed in!");
    }
    else {
        await next();
    }
};