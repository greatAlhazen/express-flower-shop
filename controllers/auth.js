const mongoose = require('mongoose');
const User = require('../models/user');
const createError = require('../utils/error');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');




// login page
module.exports.getlogin = (req,res) =>{
   if(!req.user){
    res.render('login',{
        path:req.query.path
    })
    }else{
        req.flash('error','you already logged in');
        res.status(302).redirect('/home/');
    }

}

// register page
module.exports.getRegister = (req,res) =>{
    if(!req.user){
        res.render('register')
        }else{
            req.flash('error','you already logged in');
            res.status(302).redirect('/home/');
        }
}

// register configuration
module.exports.postRegister =async (req,res,next) =>{
    if(!req.user){
        try{
            const {username,email,password} = req.body.user;
            const newUser = new User({
                username,
                email,
                password,
            });
            
            await newUser.save();
            req.flash('success','Successfully Sign Up');
            res.status(201).redirect('/auth/login');
            
            // register error handling
        }catch(err){ 
            req.flash('error',err.message)
            res.status(302).redirect('/auth/register');
        }
    }else{
        req.flash('error','you already logged in');
        res.status(302).redirect('/home/');
    }
    
   
}

// login configuration
module.exports.postLogin = async(req,res,next) =>{
    const user = await User.findOne({username:req.body.username});
   
    // user not found
    if(!user) {
        req.flash('error','User Not Found');
        res.status(302).redirect('/auth/login');
    }else{
        // password incorrect
        const correctPassword = bcrypt.compareSync(req.body.password,user.password);
        if(!correctPassword){
            req.flash('error','Wrong Credentials');
            res.status(302).redirect('/auth/login');
        }else{
             // everything okey
            const token = jwt.sign({id:user._id, admin:user.isAdmin},process.env.JWT);

             req.session.token = token;

            req.flash('success','Successfuly Login Welcome')
            if(req.query.path === 'products'){
                res.status(201).redirect('/product/products');
            }else{
                res.status(201).redirect('/home/');
            }
        };
    };    
}

 // logout configuration
module.exports.logout = (req,res,next) =>{
    req.session.token = null;
    req.flash('success','GoodBye See You Later');

    if(req.query.path === 'products'){
        res.status(302).redirect('/product/products')
    }else{
        res.status(302).redirect('/home/')
    }
   
}