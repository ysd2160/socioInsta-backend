import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from "../model/userModel.js"

export const Register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const user = await User.findOne({ email })
        if (user) {
            return res.json({
                message: "User Exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            username, email, password: hashedPassword
        })
        return res.json({
            status: 201,
            message: "user Created",
            newUser
        })
    } catch (error) {
        console.log(error);

    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })

        if (!user) {
            return res.json({
                status: 400,
                message: "user not exists",
            })
        }
       console.log("Entered password:", password);
console.log("Stored hash:", user.password);
        
        const hashedPassword = await bcrypt.compare(password, user.password)
console.log("Match:", hashedPassword);
        if (!hashedPassword) {
            return res.json({
                status: 400,
                message: "invalid Creditenitial",
            })
        }
        const token = jwt.sign({ user: user }, "secret")

        return res.cookie("token", token, res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }))
            .json({
                status: 200,
                message: "Login successfully",
                user,
            })
    } catch (error) {
        console.log(error);

    }
}
export const Logout = async (req, res) => {
    try {
        res.clearCookie("token")
            .status(200)
            .json({
                message: "logout sucessfully"
            })
    } catch (error) {

    }
}