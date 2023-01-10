const router = require('express').Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const Cart = require('../models/cart');
const getUser = require('../utils/getUser');
const verify = require('../utils/verifyToken');
const catchAsync = require('../utils/asyncError');
const User = require('../models/user');

//stripe success page
router.get(
	'/success/:id',
	verify.verifyToken,
	verify.verifyAndAuthorize,
	getUser.jwtVerify,
	catchAsync(getUser.sendUser),
	catchAsync(async (req, res, next) => {
		await Cart.findOneAndDelete({ owner: id });
		const user = await User.findById(req.params.id);
		user.cartQuantity = 0;
		await user.save();

		res.render('stripe/success');
	})
);

///stripe cancel page
router.get('/cancel/:id', verify.verifyToken, verify.verifyAndAuthorize, (req, res) => {
	res.render('stripe/cancel');
});

//stripe redirect
router.post('/create-checkout-session/:id', verify.verifyToken, verify.verifyAndAuthorize, async (req, res) => {
	const cart = await Cart.findById(req.body.cartId).populate('cartItems.product');

	//cart items send stripe
	const line_items = cart.cartItems.map((item) => {
		return {
			price_data: {
				currency: 'usd',
				product_data: {
					name: item.product.title,
					images: [ item.product.image.url ],
					description: item.product.description
				},
				unit_amount: item.product.price * 100
			},
			quantity: item.quantity
		};
	});
	const session = await stripe.checkout.sessions.create({
		//shipping detail
		payment_method_types: [ 'card' ],
		shipping_address_collection: { allowed_countries: [ 'US', 'CA', 'TR' ] },
		shipping_options: [
			{
				shipping_rate_data: {
					type: 'fixed_amount',
					fixed_amount: { amount: 0, currency: 'usd' },
					display_name: 'Free shipping',
					delivery_estimate: {
						minimum: { unit: 'business_day', value: 5 },
						maximum: { unit: 'business_day', value: 7 }
					}
				}
			}
		],

		//items configuration
		line_items,
		mode: 'payment',
		success_url: `${process.env.URL}/success/${req.params.id}`,
		cancel_url: `${process.env.URL}/cancel${req.params.id}`
	});

	res.redirect(303, session.url);
});

module.exports = router;
