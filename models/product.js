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
    },
    reviews: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Reviews',
        }
    ]
},
{timestamps:true}
);

module.exports = mongoose.model('Product',ProductSchema);
