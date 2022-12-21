const router = require('express').Router();
const auth = require('../controllers/auth');
const catchAsync = require('../utils/asyncError');
const validate = require('../middleware.js')

router.route('/register').get(auth.getRegister)
.post(validate.validateUser,catchAsync(auth.postRegister));

router.route('/login').get(auth.getlogin)
.post(catchAsync(auth.postLogin));

router.route('/logout').post(auth.logout);

module.exports = router;
