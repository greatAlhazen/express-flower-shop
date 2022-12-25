const Product = require('../models/product');

module.exports.addProduct = async(req,res,next) =>{
    
    try{
        const {title,desc,price,category} = req.body.product;
        const image = {
            url:req.file.path,
            filename:req.file.filename}
         const newProduct = new Product({
            title,
            description: desc,
            price,
            category,
            image,
        });

        await newProduct.save(); 
        req.flash('success','Successfully Create Product');
        res.status(302).redirect('/admin/');
    }catch(err){
        req.flash('error',err.message)
        res.status(302).redirect('/admin/');
    }
}