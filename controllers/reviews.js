const Product = require('../models/product');
const Reviews = require('../models/review');

//create review
module.exports.createReview = async(req,res,next) =>{
    const product = await Product.findById(req.params.id);
    const review = new Reviews(req.body.reviews);
    review.author = id;
    product.reviews.push(review);
    await review.save();
    await product.save();
    req.flash('success','Review Added Successfuly');
    res.status(201).redirect(`/product/singleProduct/${product._id}?category=${product.category}`);
};

module.exports.deleteReview = async(req,res,next) =>{
    const {id,reviewId,category} = req.body;
    await Product.findByIdAndUpdate(id,{ $pull: { reviews: reviewId}});
    await Reviews.findByIdAndDelete(reviewId);
    req.flash('success','Delete Reviews Successfully');
    res.status(201).redirect(`/product/singleProduct/${id}?category=${category}`);
}