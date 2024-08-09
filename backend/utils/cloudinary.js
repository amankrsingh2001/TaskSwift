const cloudinary = require('cloudinary').v2;
const fs = require('fs')

cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_NAME, // Need to debug
    api_key: process.env.CLOUDINARY_API_KEY, //Need to debug
    api_secret:process.env.CLOUDINARY_API_SECRET //Need to debug
});


const uploadOnCloudinary = async(localFilePath) =>{
    try {
        console.log(process.env.CLOUDINARY_NAME)
        if(!localFilePath){
            console.log("Coudnt find the local file path")
            return  null;
        } 
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        //file has been uploaded successfully
        console.log('upload successfully on cloudinary')
        console.log(response.url)
        fs.unlinkSync(localFilePath)
        return response 
    } catch (error) {
        console.log(error)//remove the locally saved temp file as the upload operation for failed
        fs.unlinkSync(localFilePath) 
    }
}

module.exports = {
    uploadOnCloudinary
}