import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({ 
  cloud_name: 'dyghoopor', 
  api_key: '475382673327818', 
  api_secret: 'NVAQUYRBTxiT6Emv27Pp9wNgv1Y'
});


export const cloudinaryImageUpload = async(path)=>{
    try {
        const result = await cloudinary.uploader.upload(path,{
            folder:"social_media_practice",
            resource_type:'auto'
        })
        return result;
    } catch (error) {
     console.log(error);
        
    }
}