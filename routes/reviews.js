const router = require('express').Router();
const getUser = require('../utils/getUser');
const verify = require('../utils/verifyToken');
const reviews = require('../controllers/reviews');
const catchAsync = require('../utils/asyncError');
const validate = require('../middleware.js');

//create review
router.route('/create/:id').post(
    verify.verifyToken,
    verify.verifyAndAuthorize,
    getUser.jwtVerify,
    catchAsync(getUser.sendUser),
    validate.validateReview,
    catchAsync(reviews.createReview),
)

router.route('/delete').delete(
    verify.verifyToken,
    verify.verifyAndAuthorize,
    catchAsync(reviews.deleteReview),
)


module.exports = router;