const router = require('express').Router();
const getUser = require('../utils/getUser');
const verify = require('../utils/verifyToken');
const catchAsync = require('../utils/asyncError');
const cart = require('../controllers/cart');

//get cart
router.route('/getCart/:id').get(
    verify.verifyToken,
    verify.verifyAndAuthorize,
    getUser.jwtVerify,
    catchAsync(getUser.sendUser),
    catchAsync(cart.getCartPage),
);

//create cart
router.route('/create/:id').post(
    verify.verifyToken,
    verify.verifyAndAuthorize,
    getUser.jwtVerify,
    catchAsync(getUser.sendUser),
    catchAsync(cart.createCart),
);

//update cart
router.route('/update/:id').put(
    verify.verifyToken,
    verify.verifyAndAuthorize,
    getUser.jwtVerify,
    catchAsync(getUser.sendUser),
    catchAsync(cart.updateCart),
)

//delete cart items
router.route('/delete/:id').put(
    verify.verifyToken,
    verify.verifyAndAuthorize,
    getUser.jwtVerify,
    catchAsync(getUser.sendUser),
    catchAsync(cart.deleteItem),
)

module.exports = router;
