/**
 * Created by heavenduke on 17-9-3.
 */

let Router =require('koa-router');
let router = new Router({
    prefix: '/accounts'
});

let accountController = require('../../controllers').accounts;

router.get('account-index', '/', accountController.index);

router.get('account-show', '/:accountId', accountController.show);

router.post('account-create', '/', accountController.create);

router.put('account-update', '/:accountId', accountController.update);

router.delete('account-destroy', '/:accountId', accountController.destroy);

module.exports = router;