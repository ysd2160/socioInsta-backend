import mongoose from "mongoose"

export const dbConnection  = async () => {
    try {
        // const connection = await mongoose.connect("mongodb://127.0.0.1:27017/SocialMediaDB")
                const connection = await mongoose.connect(process.env.MONGOURI)

        // console.log(connection);
        
    } catch (error) {
        console.log(error);
        
    }
}