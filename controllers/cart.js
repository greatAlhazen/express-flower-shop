const Cart = require('../models/cart');
const User = require('../models/user');


module.exports.getCartPage = async(req,res,next) =>{
    const cart = await Cart.findOne({
        owner: id
    }).populate('cartItems.product');


    if(!cart){
        req.flash('error','Cart is empty.Discover items');
        res.status(302).redirect('/product/products')
    }else{
        let totalPrice = 0;
        cart.cartItems.forEach(item =>{
            totalPrice = totalPrice + (item.product.price * item.quantity);
        });

        res.status(201).render('cart',{
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
        });
    }

    
}

module.exports.createCart = async (req,res,next) =>{
    const cart = await Cart.findOne({
        owner: id
    });

    const user = await User.findById(id);

    if(cart){
        const item = cart.cartItems.find(c => c.product.toString() === req.body.product.toString());

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
            const cartItems = req.body

                 await Cart.findOneAndUpdate({owner: id},{
                $push: {
                    "cartItems":cartItems
                }
            })
        }
    }else{

        const newCart = new Cart({
            owner: id,
            cartItems: req.body
        });

        await newCart.save();
    }

    user.cartQuantity +=1;

    await user.save();
    res.status(201).redirect('/product/products');
}


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


    let quantity = 0;
      cart.cartItems.forEach(item =>{
        quantity = quantity + item.quantity;
      });

      user.cartQuantity = quantity;

    await user.save();

    req.flash('success','Update Cart Successfuly');
    res.redirect('/cart/getCart');
    
};

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