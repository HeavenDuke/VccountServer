/**
 * Created by heavenduke on 17-9-3.
 */

let Router =require('koa-router');
let router = new Router({
    prefix: "/sessions"
});

let sessionController = require('../../../controllers').users.sessions;

router.post('session-create', '/', sessionController.create);

router.put('session-update', '/', sessionController.update);

module.exports = router;