const mongoose = require('mongoose');
const Review = require('./review');

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


//if delete product will delete reviews relational with product
ProductSchema.post('findOneAndDelete',async function(doc){
    if(doc){
        await Review.deleteMany({
            _id:{
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Product',ProductSchema);
