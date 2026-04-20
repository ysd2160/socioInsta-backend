import express, { Router } from 'express'

import { authentication } from '../Middleware/authentication.js'
import { allPosts, allUsers, findUser, followerFollowing, getUser, suggestedUsers, toggleLike, userPosts } from '../controller/userController.js'

const router = express.Router()

router.get("/users",authentication,allUsers)
router.get("/suggesteduser",authentication,suggestedUsers)
router.get("/posts",authentication,allPosts)
router.get("/finduser",authentication,findUser)
router.get("/user-posts/:id",authentication,userPosts)
router.get("/:id",authentication,getUser)
router.post("/follow/:id",authentication,followerFollowing)
router.post("/like/:id",authentication,toggleLike)

export default router
