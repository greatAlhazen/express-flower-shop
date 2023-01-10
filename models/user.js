const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Cart = require('../models/cart');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
        select:false,
    },
    isAdmin: {
        type:Boolean,
        default:false,
        select: false,
    },
    picture:{
        url: {
            type:String,
            default:'/images/person.png'
        },
        filename: {
            type:String,
        }
    },
    cartQuantity:{
        type:Number,
        default: 0
    }
},{timestamps:true});


//before save password hash with bcrypt
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
    }
    const hash = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(this.password,hash);
    this.password = hashedPassword;
    next();
});


UserSchema.post('findOneAndDelete',async function(doc){
    if(doc){
        await Cart.deleteOne({
            owner: doc,
        })
    }
})

module.exports = mongoose.model('User',UserSchema);