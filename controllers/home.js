const User = require('../models/user');

 // home page
module.exports.homePage = async(req,res,next) =>{
    res.render('home',{
        username:req.username,
        isAdmin:req.isAdmin,
        id,
        email: req.email,
        image,
        products: req.product,
        path: 'home',
        quantity: req.cartQuantity,
    })
}