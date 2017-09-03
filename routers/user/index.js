/**
 * Created by heavenduke on 17-9-3.
 */

let routeUtils = require('../../libs').routeUtils;
let Router =require('koa-router');
let router = new Router({
    prefix: "/users"
});

let sessionRouter = require('./session');

let userController = require('../../controllers').users;

router.post('users-create', '/', userController.create);

router.get('users-show', '/', userController.show);

router.put('users-edit', '/', userController.update);

routeUtils.stack(router, "/", sessionRouter);

module.exports = router;