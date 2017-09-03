/**
 * Created by heavenduke on 17-8-29.
 */

let Server = require('./server');
let options = require('./config')(process.env.environment);

let server = new Server(options);

server.initUtils();

server.connectDb();

server.initGlobalVariables();

server.start();