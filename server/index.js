/**
 * Created by heavenduke on 17-9-3.
 */

let Koa = require('koa');
let mongoose = require('mongoose');

let cors = require('koa-cors');
let bodyParser = require('koa-bodyparser');
let convert = require('koa-convert');

let routeUtils = require('../libs').routeUtils;
let router = require('../routers');

class Server extends Koa {
    constructor(options) {
        super();
        this.opts = options || {};

        this.keys = ['vccount-server-heavenduke'];

        // this.use(session({
        //     maxAge: 60 * 60 * 1000 * 24 * 30,
        //     store: redisStore({})
        // }, this));

        this.use(convert(cors()));

        this.use(bodyParser({
            formLimit: "100mb",
            jsonLimit: "100mb",
            textLimit: "100mb"
        }));

        routeUtils.mount(this, router);

    }

    start() {

        this.listen(this.opts.server.port, () => {
            console.log(`Server listening at port ${this.opts.server.port}`)
        });

    }

    connectDb() {
        mongoose.connect(this.opts.mongodb, {
            useMongoClient: true,
            poolSize: 12
        });
    }

    initUtils() {
        require('../libs').date();
    }

    initGlobalVariables() {
        global.conf = this.opts;
        global.database = require('../database').loader;
        global.response = require('../libs').response;
    }
}

module.exports = Server;