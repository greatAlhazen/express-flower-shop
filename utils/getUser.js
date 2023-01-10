const jwt = require('jsonwebtoken');
const User = require('../models/user');

 // jsonwebtoken verify
module.exports.jwtVerify =(req,res,next) =>{
    const token = req.session.token;
    if(!token){
        req.user = undefined;
    }

    jwt.verify(token,process.env.JWT,async(err,user) =>{
        if(err){
            req.user = undefined;
        }
        req.user = user;
    })
    next();
}

 // send user specified page
module.exports.sendUser = async (req, res, next) => {
      if (req.user) {
        const user = await User.findById(req.user.id).select('+password +isAdmin');
        const {password,username,isAdmin,picture,email,cartQuantity} = user._doc;
        req.username = username;
        req.isAdmin = isAdmin;
         id = req.user.id;
         image = picture.url;
        req.email = email; 
        req.cartQuantity = cartQuantity
      } else {
        req.username = undefined;
        req.isAdmin = undefined;
        id = 1;
        image = undefined;
        req.email = undefined;
        req.cartQuantity = 0;
      }
    next();
};

