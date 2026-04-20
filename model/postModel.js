import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    post: {
        type: String,
        required: true

    },
    caption: {
        type: String
    },
    likes:[ {
        type: String
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},  { timestamps: true })
export const Post = mongoose.model("Post", postSchema)