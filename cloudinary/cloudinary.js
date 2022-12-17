const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}



cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
});


const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: process.env.FOLDER_NAME,
        allowedFormats: ['jpeg','png','jpg']
    }
});



module.exports = {
    cloudinary,
    storage
}