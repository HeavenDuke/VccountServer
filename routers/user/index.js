/**
 * Created by heavenduke on 17-9-3.
 */

let routeUtils = require('../../libs').routeUtils;
let Router =require('koa-router');
let router = new Router({
    prefix: "/users"
});

let sessionRouter = require('./session');

let authentication = require('../../middlewares').authentication;

let userController = require('../../controllers').users;

router.post('users-create', '/', authentication.guest_only, userController.create);

router.get('users-show', '/', authentication.user_only, userController.show);

router.put('users-edit', '/', authentication.user_only, userController.update);

routeUtils.stack(router, "/", sessionRouter);

module.exports = router;