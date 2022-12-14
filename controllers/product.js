const Product = require('../models/product');
const { cloudinary } = require("../cloudinary/cloudinary");
const Cart = require('../models/cart');
const User = require('../models/user');

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
    res.render('products/productsPage',{
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

    res.render('products/updateProduct',{product});
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
    const cart = await Cart.findOne({'cartItems.product': req.params.id}).populate('cartItems.product').populate('owner');

    //delete cartItems match deleted product
   const updatedCart = await Cart.findOneAndUpdate({owner: id , 'cartItems.product': req.params.id },
    {
        $pull: {
            "cartItems":{
                "product": req.params.id
            } 
        } 
    },{new:true}
    )

    //user cartQuantity update because cartItems deleted
    const user = await User.findById(cart.owner._id);
    let quantity = 0;

    updatedCart.cartItems.forEach(item =>{
        quantity = quantity + item.quantity;
    })

    user.cartQuantity = quantity;
    await user.save();


    const product = await Product.findById(req.params.id);
    //delete image in cloudinary
    await cloudinary.uploader.destroy(product.image.filename);

    await Product.findByIdAndDelete(req.params.id);
    req.flash('success','Delete Product Successfully');
    res.status(201).redirect('/admin/'); 
}


//get single product
module.exports.getProduct = async(req,res,next) =>{
    const product = await Product.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author',
        }
    });

    res.render('products/singleProduct',{
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