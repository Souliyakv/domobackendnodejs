import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
const CloundName = process.env.CLOUD_NAME;
const Api_key = process.env.API_KEY;
const Api_secret = process.env.API_SECRET;

cloudinary.config({
    cloud_name:CloundName,
    api_key:Api_key,
    api_secret:Api_secret
});

export const UploadImagee = async (image,oidImage)=>{
   try {
    if(!image) return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    if(oidImage){
        const splitUrl = oidImage.split("/");
        const image_id = splitUrl[splitUrl.length - 1].split(".")[0];
        await cloudinary.uploader.destory(image_id);
    }
    const upload = await cloudinary.uploader.upload(image,null,{
        public_id: `${Date.now()}`,
        resource_type:"auto"
    });
    return upload;
   } catch (error) {
    return console.log(error);
   }
}