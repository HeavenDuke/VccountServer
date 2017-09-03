/**
 * Created by heavenduke on 17-8-29.
 */

let routeUtils = require('../libs').routeUtils;
let Router =require('koa-router');
let router = new Router();

let userRouter = require('./user');
let accountRouter = require('./account');

routeUtils.stack(router, "/", userRouter);
routeUtils.stack(router, "/", accountRouter);

module.exports = router;