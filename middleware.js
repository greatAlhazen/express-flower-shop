const schemas = require('./schemas.js');
const createError = require('./utils/error');

 // user server side validation middleware
module.exports.validateUser = (req,res,next) =>{
    const {error} = schemas.userSchema.validate(req.body);
    if(error){
        const message = error.message;
        next(createError(403,message));
    }else{
        next();
    }    
};

 // product server side validation middleware
 module.exports.validateProduct = (req,res,next) =>{
    const {error} = schemas.productSchema.validate(req.body);
    if(error){
        const message = error.message;
        next(createError(403,message));
    }else{
        next();
    }    
};

 // review server side validation middleware
 module.exports.validateReview = (req,res,next) =>{
    const {error} = schemas.reviewSchema.validate(req.body);
    if(error){
        const message = error.message;
        next(createError(403,message));
    }else{
        next();
    }    
}