const User = require('../models/user');

module.exports.homePage = async(req,res,next) =>{
    res.render('home',{
        username:req.username,
        isAdmin:req.isAdmin,
        id:req.user.id})
}