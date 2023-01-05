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

            const updatedCart = await Cart.findOneAndUpdate({owner: id},{
                $push: {
                    "cartItems":cartItems
                }
            })

            console.log(updatedCart)
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