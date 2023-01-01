const Product = require('../models/product');
const { cloudinary } = require("../cloudinary/cloudinary");

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
};

module.exports.getProducts = (req,res) =>{
    res.render('productsPage',{
        username:req.username,
        isAdmin:req.isAdmin,
        id,
        email: req.email,
        image,
        products: req.product,
        path:'products',
    });
};

module.exports.updateProductPage = async(req,res,next) =>{
    const id = req.params.id;
    const product = await Product.findById(id);

    res.render('updateProduct',{product});
}

module.exports.updateProduct = async(req,res,next) =>{
    const id = req.params.id;

    const product = await Product.findById(id);   

    if(req.file){

        await cloudinary.uploader.destroy(product.image.filename);
        const image = {
            url:req.file.path,
            filename:req.file.filename
        };
            req.body.product.image = image;
    }

    await Product.findByIdAndUpdate(id,
        {
            $set: req.body.product,
          },
          { new: true }

        );

        req.flash('success','Update Product Succesfully');
        res.status(201).redirect('/admin/')
};


module.exports.deleteProduct = async(req,res,next) =>{
    const id = req.params.id;

    const product = await Product.findById(id);
    await cloudinary.uploader.destroy(product.image.filename);

    await Product.findByIdAndDelete(id);
    req.flash('success','Delete Product Successfully');
    res.status(201).redirect('/admin/');
}