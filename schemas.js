const joi = require('joi');

 // user server side validation schema
module.exports.userSchema = joi.object({
    user: joi.object({
        username:joi.string().min(2).required().max(40).error(new Error('Username Must Be 2 and 40 Characters')),
        email: joi.string().required().email().error(new Error(new Error('Please Enter A Valid Email'))),
        password: joi.string().required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@[-`{-~]).{6,64}$')).error(new Error('Your Password Must Be Strong')),
        repeat_password: joi.valid(joi.ref('password')).error(new Error('Password Repeat Does Not Match')),
    }).required()
})