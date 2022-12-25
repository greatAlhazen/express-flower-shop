const router = require('express').Router();
const auth = require('../controllers/auth');
const catchAsync = require('../utils/asyncError');
const validate = require('../middleware.js');
const getUser = require('../utils/getUser');

router.route('/register').get(getUser.jwtVerify,getUser.sendUser,auth.getRegister)
.post(validate.validateUser,catchAsync(getUser.jwtVerify,getUser.sendUser,auth.postRegister));

router.route('/login').get(getUser.jwtVerify,getUser.sendUser,auth.getlogin)
.post(getUser.jwtVerify,getUser.sendUser,catchAsync(auth.postLogin));

router.route('/logout').post(auth.logout);

module.exports = router;
