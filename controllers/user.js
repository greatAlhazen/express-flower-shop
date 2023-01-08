const { cloudinary } = require("../cloudinary/cloudinary");
const User = require('../models/user');
const bcrypt = require('bcryptjs');


module.exports.getUpdatePage = (req,res) =>{
    res.render('profile',{
        username:req.username,
        id,
        email: req.email,
        image,
    });
}

 // user update profile 
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

        req.flash('success','Update User Succesfully');
        res.status(201).redirect('/home/');

}

 // delete user
module.exports.deleteUser = async(req,res,next) =>{
    const user = await User.findById(req.params.id);

    if(user.picture.filename){
        //if user image is not empty delete image in cloudinary
        await cloudinary.uploader.destroy(user.picture.filename);
    }

    await User.findByIdAndDelete(req.params.id);

    req.flash('success','Delete User Succesfully');
    res.status(201).redirect('/admin/');
};


 // change password page
module.exports.changePasswordPage = (req,res) =>{
    res.render('changePasswd');
}


 // change password
module.exports.changePassword = async(req,res,next) =>{

    const {oldPassword,newPassword} = req.body;
    const user = await User.findById(req.params.id);

    if(!oldPassword || !newPassword){
        req.flash('error','Old And New Password is required');
        res.status(302).redirect(`/user/change/${req.params.id}`);
    }else{
        const isMatch = bcrypt.compareSync(oldPassword,user.password);
        if(!isMatch){
            req.flash('error','Wrong Password');
            res.status(302).redirect(`/user/change/${req.params.id}`);
        }else{
            user.password = newPassword;

            await user.save();
            req.flash('success','Password Successfully Update');
            res.status(201).redirect('/home/');
        }
    }

}