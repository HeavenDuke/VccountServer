/**
 * Created by heavenduke on 17-9-3.
 */

exports.index = async (ctx, next) => {
    ctx.body = {
        name: "account-index"
    };
};

exports.show = async (ctx, next) => {
    ctx.body = {
        name: "account-show"
    };
};

exports.create = async (ctx, next) => {
    ctx.body = {
        name: "account-create"
    };
};

exports.update = async (ctx, next) => {
    ctx.body = {
        name: "account-update"
    };
};

exports.destroy = async (ctx, next) => {
    ctx.body = {
        name: "account-destroy"
    };
};