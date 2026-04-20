import { Post } from "../model/postModel.js"
import { User } from "../model/userModel.js";
import { cloudinaryImageUpload } from "../utils/cloudinaryImageUpload.js";
import bcrypt from "bcryptjs";
export const allUsers = async(req,res)=>{
    try {
        const users = await User.find().populate("posts").populate("followers").populate("following")
        if(!users){
             return res.status(400).json({
                message: "no Users to show"
            });
        }
         return res.status(200).json({
            message: "users fetched Successfully",
            users
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error"
        });
    }
}
export const suggestedUsers = async(req,res)=>{
    try {
        const userId = req.user._id
        const users = await User.find({
            _id: { $ne: userId }
        })
        if(!users){
             return res.status(400).json({
                message: "no Users to show"
            });
        }
        // const suggestedUser = 

         return res.status(200).json({
            message: "users fetched Successfully",
            users
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error"
        });
    }
}
export const allPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("author").populate({
            path:"comments",
            populate:[
               {
                path:"author"
               },
               {
                path:"post"
               }

            ]
        })
        if (!posts) {
            return res.status(400).json({
                message: "no posts to show"
            });
        }
        return res.status(200).json({
            message: "Posts fetched Successfully",
            posts
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error"
        });

    }
}

export const userPosts = async (req, res) => {
    try {
        const userId = req.params.id
        const posts = await Post.find({
            author: req.user?._id
        }).populate("author")
        if (!posts) {
            return res.status(400).json({
                message: "No posts to Show"
            });
        }

        return res.status(200).json({
            message: "Fetched Posts Successfully",
            posts
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server error"
        });

    }
}
export const getUser = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId).populate("posts")
        if (!user) {
            return res.status(400).json({
                message: "No posts to Show"
            });
        }

        return res.status(200).json({
            message: "Fetched user Successfully",
            user
        });
    } catch (error) {
        console.log(error); 
 
        return res.status(500).json({
            message: "Server error"
        });

    }
}

export const editProfile = async (req, res) => {
    try {
        const userId = req.user?._id;
        const { username, email, password, bio } = req.body;
        const profilePic = req.file;

        const user = await User.findById(userId)

        if (!user) {
            return res.status(400).json({
                message: "User Not Found"
            });
        }
console.log(username,email,password,bio);

        if (username) user.username = username
        if (email) user.email = email
        if (bio) user.bio = bio
        if (password) user.password = await bcrypt.hash(password, 10)

        if (profilePic) {
            console.log(profilePic.path);
            
            const profilePicture = await cloudinaryImageUpload(profilePic?.path)
            user.profilePic = profilePicture.secure_url
        }

        await user.save()

        return res.status(200).json({
            message: "updated User Successfully",
            user,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error"
        });

    }
}

export const findUser = async(req,res)=>{
    try {
        const username = req.query.username
        if(!username){
            return res.status(400).json({
                message:"need of user"
            })
        }
        const user = await User.find({username}).populate("posts")
        if(!user){
            return res.status(400).json({
                message:"no user to show"
            }) 
        }
        return res.status(200).json({
                message:"find user Successfully",
                user
            })

    } catch (error) {
        res.status(500).json({
                message:"Server error"
            })
    }
}
export const followerFollowing = async (req, res) => {
    try {
        const currentUserId = req.user._id
        const targetUserId = req.params.id

        const currentUser = await User.findById(currentUserId).populate("posts")
        const targetUser = await User.findById(targetUserId).populate("posts")
        // console.log(currentUser,targetUser);
        

        if (!currentUser || !targetUser) {
            return res.status(400).json({
                message: "Some thing went wrong"
            });
        }

        const isFollowing = currentUser.following.includes(targetUserId)

        if (!isFollowing) {
            currentUser.following.push(targetUserId)
            targetUser.followers.push(currentUserId)

            await currentUser.save()
            await targetUser.save()

            return res.status(200).json({
                message: "follow successfully",
                currentUser,
                targetUser

            });
        } else {
            currentUser.following.remove(targetUserId)
            targetUser.followers.remove(currentUserId)

            await currentUser.save()
            await targetUser.save()

            return res.status(200).json({
                message: "unfollow sucessfully",
                currentUser,
                targetUser
            });
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "internal server error"

        });

    }
}

export const toggleLike = async (req, res) => {
    try {
        const userId = req.user._id
        const postId = req.params.id

        const post = await Post.findById(postId).populate("author").populate({
            path:"comments",
            populate:[
               {
                path:"author"
               },
               {
                path:"post"
               }

            ]
        })
        if (!post) {
            return res.status(400).json({
                message: "no post find",
            });
        }
        const isLike = post?.likes?.includes(userId)
        if (!isLike) {
            post.likes.push(userId)
            await post.save()
            return res.status(200).json({
                message: "liked post",
                post
            });
        } else {
            post.likes.remove(userId)
            await post.save()
            return res.status(200).json({
                message: "dislike post",
                post
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "server error"
        });

    }
}
