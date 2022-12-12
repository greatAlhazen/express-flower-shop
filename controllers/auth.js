const mongoose = require('mongoose');
const User = require('../models/user');
const createError = require('../utils/error');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');




module.exports.getlogin = (req,res) =>{
    res.render('login');
}

module.exports.getRegister = (req,res) =>{
    res.render('register');
}

module.exports.postRegister =async (req,res,next) =>{
    try{
        const newUser = new User(req.body);
        
        await newUser.save();
        req.flash('success','Successfully Sign Up');
        res.status(201).redirect('/auth/login');
        
    }catch(err){ 
        req.flash('error',err.message)
        res.status(302).redirect('/auth/register');
    }
}

module.exports.postLogin = async(req,res,next) =>{
    const user = await User.findOne({username:req.body.username});
    if(!user) return next(createError(404,'User Not Found'));
    
    const correctPassword = bcrypt.compareSync(req.body.password,user.password);

    if(!correctPassword) return next(createError(404,'wrong credentials'));

    const token = jwt.sign({id:user.id,admin:user.isAdmin},process.env.JWT);

    req.session.token = token;

    req.flash('success','Successfuly Login Welcome')
    
    res.status(201).redirect('/home/');
}