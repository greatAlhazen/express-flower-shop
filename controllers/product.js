const Product = require('../models/product');
const { cloudinary } = require("../cloudinary/cloudinary");

///add product
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

//get all products
module.exports.getProducts = (req,res) =>{
    res.render('productsPage',{
        username:req.username,
        isAdmin:req.isAdmin,
        id,
        email: req.email,
        image,
        products: req.product,
        path:'products',
        quantity: req.cartQuantity,
    });
};

//update product page
module.exports.updateProductPage = async(req,res,next) =>{
    const id = req.params.id;
    const product = await Product.findById(id);

    res.render('updateProduct',{product});
}

//update product
module.exports.updateProduct = async(req,res,next) =>{
    const id = req.params.id;

    const product = await Product.findById(id);   

    if(req.file){

        //delete old image in cloudinary
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


//delete product
module.exports.deleteProduct = async(req,res,next) =>{
    const id = req.params.id;

    const product = await Product.findById(id);
    //delete image in cloudinary
    await cloudinary.uploader.destroy(product.image.filename);

    await Product.findByIdAndDelete(id);
    req.flash('success','Delete Product Successfully');
    res.status(201).redirect('/admin/');
}


//get single product
module.exports.getProduct = async(req,res,next) =>{
    const id = req.params.id;
    const product = await Product.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author',
        }
    });

    res.render('singleProduct',{
        username:req.username,
        isAdmin:req.isAdmin,
        id,
        email: req.email,
        image,
        products: req.product,
        path: 'singleProduct',
        product,
        quantity: req.cartQuantity,
        reviews: product.reviews,
    })
}