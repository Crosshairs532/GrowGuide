"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postModel = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
    },
    images: {
        type: [String],
    },
    categories: {
        type: [String],
    },
    premium: {
        type: Boolean,
    },
    votes: {
        type: Number,
    },
    comments: {
        type: [
            {
                userId: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'users',
                },
                userComments: {
                    type: String,
                },
            },
        ],
        // _id: false,
    },
    description: {
        type: String,
    },
}, {
    timestamps: true,
});
exports.postModel = (0, mongoose_1.model)('posts', postSchema);
