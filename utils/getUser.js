const jwt = require('jsonwebtoken');
const User = require('../models/user');

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

module.exports.sendUser = async (req, res, next) => {
      if (req.user) {
        const user = await User.findById(req.user.id)
        const {password,username,isAdmin,picture,email} = user._doc;
        req.username = username;
        req.isAdmin = isAdmin;
         id = req.user.id;
         image = picture.url;
        req.email = email; 
      } else {
        req.username = undefined;
        req.isAdmin = undefined;
        id = undefined;
        image = undefined;
        req.email = undefined;
      }
    next();
};

