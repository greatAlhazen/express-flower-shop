const router = require('express').Router();
const home = require('../controllers/home');
const getUser = require('../utils/getUser');
const getProduct = require('../utils/getProduct');
const catchAsync = require('../utils/asyncError');

//get home page
router.route('/').get(
    getUser.jwtVerify,
    catchAsync(getUser.sendUser),
    catchAsync(getProduct),
    home.homePage
    );

module.exports = router;
