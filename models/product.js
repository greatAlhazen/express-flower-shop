const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type:String,
    },
    description: {
        type:String,
    },
    price: {
        type:Number,
    },
    image: {
        url:{
            type:String,
        },
        filename: {
            type:String,
        }
    },
    category: {
        type:String,
    }
},
{timestamps:true}
);

module.exports = mongoose.model('Product',ProductSchema);
