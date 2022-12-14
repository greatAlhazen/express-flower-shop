const User = require('../models/user');

 // admin dashboard page
module.exports.getPage = async(req,res,next) =>{
    const users = await User.find().sort({_id:-1});
    
    res.render('admin/dashboard',{
        users:users,
        username:req.username,
        id,
        email: req.email,
        image,
        products: req.product,
        quantity: req.cartQuantity,
    })
}