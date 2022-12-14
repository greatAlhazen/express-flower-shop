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
        const {password,username,isAdmin} = user._doc;
        req.username = username;
        req.isAdmin = isAdmin;
      } else {
        req.username = undefined;
        req.isAdmin = undefined;
      }
    next();
};

