const User = require('../models/user');

module.exports.getPage = async(req,res,next) =>{
    const users = await User.find().sort({_id:-1});
    res.render('dashboard',{
        users:users,
        username:req.username,
        id,
        email: req.email,
        image,})
}