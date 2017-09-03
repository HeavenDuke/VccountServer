/**
 * Created by heavenduke on 17-9-3.
 */

exports.error = (code, message) => {
    return {
        code,
        message
    };
};

exports.success = (code, message, data) => {
    return {
        code,
        message,
        data
    };
};