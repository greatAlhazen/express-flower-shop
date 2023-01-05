const router = require('express').Router();
const getUser = require('../utils/getUser');
const verify = require('../utils/verifyToken');
const catchAsync = require('../utils/asyncError');
const cart = require('../controllers/cart');

router.route('/getCart').get(
    getUser.jwtVerify,
    getUser.sendUser,
    verify.verifyToken,
    verify.verifyAndAuthorize,
    catchAsync(cart.getCartPage),
);

router.route('/create').post(
    getUser.jwtVerify,
    getUser.sendUser,
    verify.verifyToken,
    verify.verifyAndAuthorize,
    catchAsync(cart.createCart),
);

module.exports = router;
