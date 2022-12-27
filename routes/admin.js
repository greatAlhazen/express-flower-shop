const router = require('express').Router();
const catchAsync = require('../utils/asyncError');
const admin = require('../controllers/admin');
const verify = require('../utils/verifyToken');
const getUser = require('../utils/getUser');
const getProduct = require('../utils/getProduct');


router.route('/').get(
    getUser.jwtVerify,
    getUser.sendUser,
    verify.verifyToken,
    verify.verifyAdmin,
    catchAsync(getProduct),
    catchAsync(admin.getPage)
);

module.exports = router;