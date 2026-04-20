import express, { Router } from 'express'
import { addComment, deleteComment, editComment } from '../controller/commentController.js'
import { authentication } from '../Middleware/authentication.js'

const router = express.Router()

router.post("/add-comment/:id",authentication,addComment)
router.put("/edit-comment/:id",authentication,editComment)
router.delete("/delete-comment/:id",authentication,deleteComment)

export default router
