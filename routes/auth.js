const router = require('express').Router();
const auth = require('../controllers/auth');
const catchAsync = require('../utils/asyncError');
const validate = require('../middleware.js');
const getUser = require('../utils/getUser');

///register routes
router.route('/register').get(
    getUser.jwtVerify,
    catchAsync(getUser.sendUser),
    auth.getRegister,
)
.post(
    validate.validateUser,
    getUser.jwtVerify,
    catchAsync(getUser.sendUser),
    catchAsync(auth.postRegister),
    );

//login routes
router.route('/login').get(
    getUser.jwtVerify,
    catchAsync(getUser.sendUser),
    auth.getlogin
)
.post(
    getUser.jwtVerify,
    catchAsync(getUser.sendUser),
    catchAsync(auth.postLogin)
);

//logout route
router.route('/logout').post(auth.logout);

module.exports = router;
