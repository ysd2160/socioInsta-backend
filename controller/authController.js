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

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                status: 400,
                message: "user not exists",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log({
            entered: JSON.stringify(password),
            hash: user.password,
            hashLength: user.password.length,
            isMatch,
            email: user.email
        });
        if (!isMatch) {
            return res.json({
                status: 400,
                message: "invalid Credentials",
            });
        }

        const token = jwt.sign(
            { user: user },
            "secret",
            { expiresIn: "1d" }
        );

        return res
            .cookie("token", token, {
                httpOnly: true,
                secure: false, // local ke liye
                sameSite: "Lax",
            })
            .json({
                status: 200,
                message: "Login successfully",
                user,
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};
export const Logout = async (req, res) => {
    try {
        return res
            .clearCookie("token", {
                httpOnly: true,
                secure: false, // same as login
                sameSite: "Lax"
            })
            .status(200)
            .json({
                message: "logout successfully"
            });
    } catch (error) {

    }
}