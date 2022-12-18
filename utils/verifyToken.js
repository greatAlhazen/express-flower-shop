const jwt = require('jsonwebtoken');


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

module.exports.verifyAndAuthorize = (req,res,next) =>{
   this.verifyToken(req,res,() =>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            req.flash('error','You Are Not Authorized');
            res.status(302).redirect('/home/');
        }
    })
};

module.exports.verifyAdmin = (req,res,next) =>{
    this.verifyToken(req,res,() =>{
        if(req.user.isAdmin){
            next()
        }else{
            req.flash('error','You Are Not Authorized');
            res.status(302).redirect('/home/')
        }
    })
}