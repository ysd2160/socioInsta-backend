//third Party imports
import cookieParser from 'cookie-parser'
import express from 'express'

//file import
import { dbConnection } from './db/dbConnection.js'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import postRoutes from './routes/postRoutes.js'
import cors from "cors"
import dotenv from 'dotenv'
dotenv.config()

const app = express()


//middlewares
app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: ["http://localhost:5173",'http://10.183.163.203:5173'],
  credentials: true
}));

app.use("/v1/api/auth",authRoutes)
app.use("/v1/api/user",userRoutes)
app.use("/v1/api/post",postRoutes)
app.use("/v1/api/comment",commentRoutes)

//db connection
dbConnection()


//routes
app.get("/",(req,res)=>{
    res.send("hello working!")
})



//server port
app.listen(3000)