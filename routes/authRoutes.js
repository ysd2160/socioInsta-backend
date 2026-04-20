import express, { Router } from 'express'

import { authentication } from '../Middleware/authentication.js'
import { Login, Logout, Register } from '../controller/authController.js'
import { editProfile } from '../controller/userController.js'
import { upload } from '../Middleware/multer.js'

const router = express.Router()

router.post("/signup",Register)
router.post("/login",Login)
router.put("/edit-profile",authentication,upload.single('profilePic'),editProfile)
router.get("/logout",authentication,Logout)

export default router
