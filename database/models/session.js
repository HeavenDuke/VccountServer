/**
 * Created by heavenduke on 17-9-3.
 */

let Session = {
    expiresAt: {
        type: Number,
        required: true,
        default: 60 * 60 * 24
    },
    refreshableAt: {
        type: Number,
        required: true,
        default: 60 * 60 * 24 * 7
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
};

module.exports = Session;