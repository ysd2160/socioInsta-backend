import { Comment } from "../model/commentModel.js"
import { Post } from "../model/postModel.js"

export const addComment = async (req, res) => {
    try {
        const {text} = req.body
        // console.log(text);
        
        const userId = req.user._id
        const postId = req.params.id

        const post = await Post.findById(postId)

        if (!post) {
            return res.status(400).json({
                message: "something went wrong",
            });
        }

        const comment = await Comment.create({
            author: userId,
            post: postId,
            text:text,
        })
const populatedComment = await Comment.findById(comment._id).populate("author").populate("post")
        post.comments.push(comment._id)
        await post.save()

        return res.status(200).json({
            message: "comment add successfully",
            comment,
            populatedComment
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "internal server error",
        });
    }
}
export const editComment = async (req, res) => {
    try {
        const commentId = req.params.id

        const { text } = req.body
        const comment = await Comment.findById(commentId)

        if (!comment) {
            return res.status(400).json({
                message: "Something went wrong",
            });
        }
        if (text) comment.text = text;

        await comment.save()
        return res.status(200).json({
            message: "comment edit successfully",
            comment,

        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "internal server errror"
        });
    }
}

export const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id

        const comment = await Comment.findByIdAndDelete(commentId)

        if (!comment) {
            return res.status(400).json({
                message: "Something went wrong",
            });
        }
        return res.status(200).json({
            message: "comment delete successfully",
            comment,

        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "internal server errror"
        });

    }
}