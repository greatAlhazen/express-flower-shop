const jwt = require('jsonwebtoken');

 // jsonwebtoken verify
module.exports.verifyToken = (req,res,next) =>{
    const token = req.session.token;
    if(!token){
        req.flash('error','You did Not Login');
        res.status(302).redirect('/auth/login');
    }else{
        jwt.verify(token,process.env.JWT,(err,user) =>{
            if(err){
                req.flash('error','Token is Not Valid');
                res.status(302).redirect('/auth/login');
            }else{
                req.user = user;
                next();
            }
        });
    }
};

 // user authorization
module.exports.verifyAndAuthorize = (req,res,next) =>{
   this.verifyToken(req,res,() =>{
    console.log(req.user.id,req.params.id)
        if(req.user.id === req.params.id || req.user.admin){
            next();
        }else{
            req.flash('error','You Are Not Authorized');
            res.status(302).redirect('/home/');
        }
    })
};

 // admin authorization
module.exports.verifyAdmin = (req,res,next) =>{
    this.verifyToken(req,res,() =>{
        if(req.user.admin){
            next()
        }else{
            req.flash('error','You Are Not Authorized');
            res.status(302).redirect('/home/')
        }
    })
}