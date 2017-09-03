/**
 * Created by heavenduke on 17-9-3.
 */

exports.index = async (ctx, next) => {
    let date = ctx.query.date;
    let accounts = ctx.current_user.accounts.filter((item) => {
        if (date) {
            date = Date.parse(ctx.query.date);
            return Date.parse(item.time) >= date && Date.parse(item.time) < date + 24 * 60 * 60 * 1000;
        }
        return true;
    });
    ctx.body = global.response.success(200, 'success', accounts);
};

exports.show = async (ctx, next) => {
    let account = ctx.current_user.accounts.id(ctx.params.accountId);
    ctx.body = global.response.success(200, 'success', account);
};

exports.create = async (ctx, next) => {
    ctx.current_user.accounts.push({
        explanation: ctx.request.body.explanation,
        budget: ctx.request.body.budget,
        location: ctx.request.body.location,
        time: new Date(ctx.request.body.time),
        method: ctx.request.body.method,
    });
    await ctx.current_user.save();
    ctx.body = global.response.success(200, 'success', ctx.current_user.accounts[ctx.current_user.accounts.length - 1]);
};

exports.update = async (ctx, next) => {
    let account = ctx.current_user.accounts.id(ctx.params.accountId);
    for(let key in ctx.request.body) {
        if (['explanation', 'budget', 'location', 'time', 'method'].includes(key)) {
            account[key] = ctx.request.body[key];
        }
    }
    await ctx.current_user.save();
    ctx.body = global.response.success(200, 'success', account);
};

exports.destroy = async (ctx, next) => {
    await ctx.current_user.accounts.id(ctx.params.accountId).remove();
    await ctx.current_user.save();
    ctx.body = global.response.success(200, 'success');
};