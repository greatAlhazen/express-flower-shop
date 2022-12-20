const router = require('express').Router();
const catchAsync = require('../utils/asyncError');
const admin = require('../controllers/admin');
const verify = require('../utils/verifyToken');
const getUser = require('../utils/getUser');


router.route('/').get(getUser.jwtVerify,getUser.sendUser,verify.verifyToken,verify.verifyAdmin,catchAsync(admin.getPage))

module.exports = router;