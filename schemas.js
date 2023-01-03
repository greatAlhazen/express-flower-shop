const joi = require('joi');

 // user server side validation schema
module.exports.userSchema = joi.object({
    user: joi.object({
        username:joi.string().min(2).required().max(40).error(new Error('Username Must Be 2 and 40 Characters')),
        email: joi.string().required().email().error(new Error(new Error('Please Enter A Valid Email'))),
        password: joi.string().required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@[-`{-~]).{6,64}$')).error(new Error('Your Password Must Be Strong')),
        repeat_password: joi.valid(joi.ref('password')).error(new Error('Password Repeat Does Not Match')),
    }).required()
});


 // product server side validation scheme
 module.exports.productSchema = joi.object({
    product: joi.object({
        file:joi.string().required().error(new Error('image field cannot be empty')),
        title:joi.string().min(4).required().max(40).messages({
            'string.base': `title should be a type of text`,
            'string.empty': `title cannot be an empty field`,
            'string.min': `title should have a minimum length of 4`,
            'string.max': `title should have a maximum length of 40`,
            'any.required': `title is a required field`,
          }),
        desc: joi.string().required().min(10).max(300).messages({
            'string.base': `description should be a type of text`,
            'string.empty': `description cannot be an empty field`,
            'string.min': `description should have a minimum length of 10`,
            'string.max': `description should have a maximum length of 300`,
            'any.required': `description is a required field`,
          }),
        price: joi.string().required().min(1).max(8).messages({
            'number.base': `price should be a type of text`,
            'number.empty': `price cannot be an empty field`,
            'number.min': `price should have a minimum length of 1`,
            'number.max': `price should have a maximum length of 8`,
            'any.required': `price is a required field`,
          }),
        category: joi.string().required().valid('biennials','perennials','annuals').messages({
            'string.base':`category should be text`,
            'string.empty':`category cannot be empty`,
            'any.invalid': `category must be biennials- perennials or annuals`,
        }),
    })
});

 // product server side validation scheme
 module.exports.reviewSchema = joi.object({
  reviews: joi.object({
      body: joi.string().required().min(10).max(300).messages({
          'string.base': `description should be a type of text`,
          'string.empty': `description cannot be an empty field`,
          'string.min': `description should have a minimum length of 10`,
          'string.max': `description should have a maximum length of 300`,
          'any.required': `description is a required field`,
        }),
      rating: joi.string().required().min(1).max(5).messages({
          'number.base': `rating should be a type of text`,
          'number.empty': `rating cannot be an empty field`,
          'number.min': `rating should have a minimum length of 1`,
          'number.max': `rating should have a maximum length of 5`,
          'any.required': `rating is a required field`,
        }),
  }).required()
});