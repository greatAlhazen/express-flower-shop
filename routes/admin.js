const router = require('express').Router();
const catchAsync = require('../utils/asyncError');
const admin = require('../controllers/admin');
const verify = require('../utils/verifyToken');
const getUser = require('../utils/getUser');
const getProduct = require('../utils/getProduct');

//get admin page
router.route('/').get(
    verify.verifyToken,
    verify.verifyAdmin,
    getUser.jwtVerify,
    catchAsync(getUser.sendUser),
    catchAsync(getProduct),
    catchAsync(admin.getPage)
);

module.exports = router;