/**
 * Created by heavenduke on 17-9-3.
 */

module.exports = async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin','localhost:8081');
    await next();
};