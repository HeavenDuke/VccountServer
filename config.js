/**
 * Created by heavenduke on 17-9-3.
 */

module.exports = function (environment) {
    let config = {
        server: {
            port: 3000
        },
        mongodb: 'mongodb://localhost:27017/vccount',
    };

    if (environment == 'development') {
        config.server.host = '127.0.0.1'
    }

    return config;
};