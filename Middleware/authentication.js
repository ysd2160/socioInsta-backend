import jwt from 'jsonwebtoken'
export const authentication = (req,res,next)=>{
//     console.log("Cookies:", req.cookies);
// console.log("Token:", req.cookies?.token);
    const token = req.cookies.token;
    if(!token){
        return res.json({
            status: 401,
            message: "Unautorized needs to login",
        })
    }
    try {
        const decoded = jwt.decode(token,"secret")
        // console.log(decoded);
        
        req.user = decoded.user
        next()
    } catch (error) {
        console.log(error);
        
    }
} 