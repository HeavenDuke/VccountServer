/**
 * Created by heavenduke on 17-9-3.
 */

let Router =require('koa-router');
let router = new Router({
    prefix: '/accounts'
});

let accountController = require('../../controllers').accounts;

let authentication = require('../../middlewares').authentication;

router.get('account-index', '/', authentication.user_only, accountController.index);

router.get('account-show', '/:accountId', authentication.user_only, accountController.show);

router.post('account-create', '/', authentication.user_only, accountController.create);

router.put('account-update', '/:accountId', authentication.user_only, accountController.update);

router.delete('account-destroy', '/:accountId', authentication.user_only, accountController.destroy);

module.exports = router;