const schemas = require('./schemas.js');

 // user server side validation middleware
module.exports.validateUser = (req,res,next) =>{
    const {error} = schemas.userSchema.validate(req.body);
    if(error){
        const message = error.message;
        req.flash('error',message);
        res.status(400).redirect('/auth/register');
    }else{
        next();
    }

    
}