/**
 * Created by heavenduke on 17-9-3.
 */

exports.index = async (ctx, next) => {
    let date = ctx.query.date;
    let _dates = {}, dates = [], selected_date = null;
    if (date) {
        date = new Date();
        ctx.current_user.accounts.forEach(function (account) {
            _dates[account.time.format('yyyy-MM-dd')] = account.time;
        });
        for(var key in _dates) {
            dates.push(_dates[key]);
        }
        dates.sort();
        dates.forEach(function (_date) {
            if (_date <= date) {
                selected_date = _date;
            }
        });
        if (selected_date) {
            let accounts = ctx.current_user.accounts.filter((item) => {
                return item.time.format('yyyy-MM-dd') == selected_date.format('yyyy-MM-dd');
            });
            ctx.body = global.response.success(200, 'success', {
                date: selected_date.format('yyyy-MM-dd'),
                accounts: accounts,
                isLast: false
            });
        }
        else {
            ctx.body = global.response.success(200, 'success', {
                isLast: true
            });
        }
    }
    else {
        ctx.current_user.accounts.forEach(function (account) {
            _dates[account.time.format('yyyy-MM-dd')] = account.time;
        });
        for(var key in _dates) {
            dates.push(_dates[key]);
        }
        dates.sort();
        var slices = dates.slice(dates.length - 7);
        for(var i = 0; i < slices.length; i++) {
            slices[i] = slices[i].format('yyyy-MM-dd');
        }
        var result = {};
        let accounts = ctx.current_user.accounts.filter((item) => {
            if (slices.includes(item.time.format('yyyy-MM-dd'))) {
                if (!(item.time.format('yyyy-MM-dd') in result)) {
                    result[item.time.format('yyyy-MM-dd')] = [];
                }
                result[item.time.format('yyyy-MM-dd')].push(item);
            }
            return true;
        });
        ctx.body = global.response.success(200, 'success', {
            accounts: result,
            isLast: slices.length == dates.length
        });
    }
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
        time: new Date(ctx.request.body.date),
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