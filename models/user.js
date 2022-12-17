const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Username is not blank Please Enter Username'],
        maxLength:[40,'Username Can Not Exceed 40 characters'],
        minLength:[2,'Username Should have 2 Characters at least']
    },
    email:{
        type:String,
        required:[true,'Email is not blank, please Enter a email'],
        unique:[true, 'Email is not match existing emails'],
    },
    password:{
        type:String,
        required:[true,'password is not blank, please enter your password'],
        minLength:[8,'password should be greater than 8 characters'],
    },
    isAdmin: {
        type:Boolean,
        default:false,
    },
    picture:{
        url: {
            type:String,
            default:'/images/person.png'
        },
        filename: {
            type:String,
        }
    }
},{timestamps:true});


UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
    }
    const hash = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(this.password,hash);
    this.password = hashedPassword;
    next();
});

module.exports = mongoose.model('User',UserSchema);