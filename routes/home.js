const router = require('express').Router();
const home = require('../controllers/home');
const getUser = require('../utils/getUser');
const getProduct = require('../utils/getProduct');
const catchAsync = require('../utils/asyncError');

router.route('/').get(
    getUser.jwtVerify,
    getUser.sendUser,
    catchAsync(getProduct),
    home.homePage);

module.exports = router;
