const Product = require('../models/product');
const Reviews = require('../models/review');


module.exports.createReview = async(req,res,next) =>{
    const product = await Product.findById(req.params.id);
    const review = new Reviews(req.body.reviews);
    review.author = id;
    product.reviews.push(review);
    await review.save();
    await product.save();
    req.flash('success','Review Added Successfuly');
    res.status(201).redirect(`/product/singleProduct/${product._id}?category=${product.category}`);
}