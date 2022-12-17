const router = require('express').Router();
const auth = require('../controllers/auth');
const catchAsync = require('../utils/asyncError');

router.route('/register').get(auth.getRegister)
.post(catchAsync(auth.postRegister));

router.route('/login').get(auth.getlogin)
.post(catchAsync(auth.postLogin));

router.route('/logout').post(auth.logout);

module.exports = router;
