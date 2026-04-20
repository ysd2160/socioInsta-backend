import express, { Router } from 'express'
import { authentication } from '../Middleware/authentication.js'
import { CreatePost, deletePost, editPost } from '../controller/postController.js'
import { upload } from '../Middleware/multer.js'


const router = express.Router()

router.post("/create-post",authentication,upload.single('img'),CreatePost)
router.put("/edit-post/:id",authentication,editPost)
router.delete("/delete-post/:id",authentication,deletePost)

export default router
