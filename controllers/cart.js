const Cart = require('../models/cart');
const User = require('../models/user');

//get user cart
module.exports.getCartPage = async(req,res,next) =>{
    const cart = await Cart.findOne({
        owner: id
    }).populate('cartItems.product');

    //if cart is empty redirect user
    if(!cart){
        req.flash('error','Cart is empty.Discover items');
        res.status(302).redirect('/product/products')
    }else{

        ///total price from cart
        let totalPrice = 0;
        cart.cartItems.forEach(item =>{
            totalPrice = totalPrice + (item.product.price * item.quantity);
        });

        res.status(201).render('products/cart',{
            username:req.username,
            isAdmin:req.isAdmin,
            id,
            email: req.email,
            image,
            products: req.product,
            quantity: req.cartQuantity,
            path: 'cart',
            cartItems: cart.cartItems,
            totalPrice,
            cartId: cart._id,
        });
    }

    
}

//create cart
module.exports.createCart = async (req,res,next) =>{
    const cart = await Cart.findOne({
        owner: id
    });

    const user = await User.findById(id);

    //cart is not empty
    if(cart){
        const item = cart.cartItems.find(c => c.product.toString() === req.body.product.toString());

        //product in cart
        if(item){
            item.quantity +=1

            await Cart.findOneAndUpdate({owner: id , 'cartItems.product': req.body.product },
            {
                $set: {
                    "cartItems.$":{
                        ...item,
                    }
                } 
            }
            )
        }else{

            //product not in cart
            const cartItems = req.body

                 await Cart.findOneAndUpdate({owner: id},{
                $push: {
                    "cartItems":cartItems
                }
            })
        }
    }else{

        //cart is empty
        const newCart = new Cart({
            owner: id,
            cartItems: req.body
        });

        await newCart.save();
    }

    //user cart quantity update
    user.cartQuantity +=1;

    await user.save();
    res.status(201).redirect('/product/products');
}


//update cart
module.exports.updateCart = async(req,res,next) =>{
    const user = await User.findById(id);
    const cart = await Cart.findOneAndUpdate({owner: id , 'cartItems.product': req.body.product },
    {
        $set: {
            "cartItems.$":{
                product:req.body.product,
                quantity: req.body.quantity,
            }
        } 
    },{
        new:true
    }
    );

    ///update user quantity
    let quantity = 0;
      cart.cartItems.forEach(item =>{
        quantity = quantity + item.quantity;
      });

      user.cartQuantity = quantity;

    await user.save();

    req.flash('success','Update Cart Successfuly');
    res.redirect('/cart/getCart');
    
};

//delete item from cart
module.exports.deleteItem = async(req,res,next) =>{
    const cartItem = req.body;
    console.log(req.body);
    const user = await User.findById(id);
     await Cart.findOneAndUpdate({owner: id},{
        $pull: {
            "cartItems":cartItem
        }
    });

    user.cartQuantity = user.cartQuantity - req.body.quantity;

    await user.save();

    req.flash('success','Delete Item Successfully');

    res.status(201).redirect('/cart/getCart');

}