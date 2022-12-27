const Product = require('../models/product');


const getProduct = async (req, res, next) => {
    const products = await Product.find();
    if(products){
        req.product = products;
    }else{
        req.product = 'Products are not found';
    }
    next();
};

module.exports = getProduct;