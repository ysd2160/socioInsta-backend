import { Post } from "../model/postModel.js";
import { User } from "../model/userModel.js";
import { cloudinaryImageUpload } from "../utils/cloudinaryImageUpload.js";

export const CreatePost = async (req, res) => {
    try {
        const author = req.user?._id
        const { caption } = req.body;
        const media = req.file;
        if (!media) {
            return res.json({
                status: 400,
                message: "Something went wrong",
            })
        } 

        const postImage = await cloudinaryImageUpload(media?.path)
        const newPost = await Post.create({
            post: postImage?.secure_url,
            caption,
            author
        })
        const populatedPost = await Post.findById(newPost._id)
            .populate("author")
            .populate("comments");

        const user = await User.findById(author)
        
        user.posts.push(populatedPost)
        await user.save()

        
        return res.status(200).json({
            message: "Post Created successfully",
            // newPost,
            populatedPost,
            user
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server error"
        });

    }
}

export const editPost = async (req, res) => {
    try {
        const postId = req.params.id
        const { caption } = req.body
        
        console.log(caption);
        
        const post = await Post.findById(postId).populate('author')
        if (!post) {
            return res.status(400).json({
                message: "Post not find"
            });
        }

        if (caption) {
            post.caption = caption;

            await post.save()
        }
        return res.status(200).json({
            message: "update post successfully",
            post
        });


    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "intrenal server error",
        });

    }
}

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id

        const post = await Post.findByIdAndDelete(postId)

        if (!post) {
            return res.status(400).json({
                message: "something went wrong",
            });
        }

        return res.status(200).json({
            message: "delete post successfully",
            post
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "internal server error",
        });

    }
}