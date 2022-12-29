const Product = require('../models/product');


const getProduct = async (req, res, next) => {
   let products;
    const category = req.query.category;
    const sort = req.query.sort

    try{ 
        if(category){
        products = await Product.find({"category": {$eq: category}});
    }else if(sort){
        if(sort === 'new'){
            products = await Product.find().sort({createdAt: -1});
        }else{
            products = await Product.find().sort({createdAt: 1});
        }
    }else{
        products = await Product.find();
    }
}catch(err){
        products = 'Products are not found'
    }
       
    req.product = products;
    next();
};

module.exports = getProduct;