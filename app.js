/**
 * Created by heavenduke on 17-8-29.
 */

let session = require('koa-session');
let redisStore = require('koa-redis');
let Koa = require('koa');

let app = new Koa();
app.keys = ['vccount-server-heavenduke'];

app.use(session({
    store: redisStore({
        // Options specified here
    })
}, app));


app.listen(3001, () => {
    console.log(`Server listening at port ${3001}`)
});