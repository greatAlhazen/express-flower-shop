const router = require('express').Router();
const getUser = require('../utils/getUser');
const verify = require('../utils/verifyToken');
const catchAsync = require('../utils/asyncError');
const cart = require('../controllers/cart');

//get cart
router.route('/getCart').get(
    getUser.jwtVerify,
    catchAsync(getUser.sendUser),
    verify.verifyToken,
    verify.verifyAndAuthorize,
    catchAsync(cart.getCartPage),
);

//create cart
router.route('/create').post(
    getUser.jwtVerify,
    catchAsync(getUser.sendUser),
    verify.verifyToken,
    verify.verifyAndAuthorize,
    catchAsync(cart.createCart),
);

//update cart
router.route('/update').put(
    getUser.jwtVerify,
    catchAsync(getUser.sendUser),
    verify.verifyToken,
    verify.verifyAndAuthorize,
    catchAsync(cart.updateCart),
)

//7delete cart items
router.route('/delete').put(
    getUser.jwtVerify,
    catchAsync(getUser.sendUser),
    verify.verifyToken,
    verify.verifyAndAuthorize,
    catchAsync(cart.deleteItem),
)

module.exports = router;
