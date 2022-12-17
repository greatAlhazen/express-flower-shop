const { cloudinary } = require("../cloudinary/cloudinary");
const User = require('../models/user');


module.exports.getUpdatePage = (req,res) =>{
    res.render('profile',{
        username:req.username,
        id,
        email: req.email,
        image,
    });
}

module.exports.postUpdate = async(req,res,next) =>{
    const user = await User.findById(req.params.id);
   
    if(user.picture.filename){
        await cloudinary.uploader.destroy(user.picture.filename);
    }
    
    if(req.file){
        req.body.picture = {url:req.file.path,filename:req.file.filename}
    }


    await User.findByIdAndUpdate(req.params.id,
        {
            $set: req.body,
          },
          { new: true }

        );

        res.status(201).redirect('/home/');

}