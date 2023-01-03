const router = require('express').Router();
const getUser = require('../utils/getUser');
const verify = require('../utils/verifyToken');
const reviews = require('../controllers/reviews');

router.route('/create/:id').post(
    verify.verifyToken,
    verify.verifyAndAuthorize,
    getUser.jwtVerify,
    getUser.sendUser,
    reviews.createReview,
)


module.exports = router;