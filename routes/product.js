const router = require('express').Router();
const product = require('../controllers/product');
const catchAsync = require('../utils/asyncError');
const verify = require('../utils/verifyToken');
const validate = require('../middleware.js');

router.route('/add').post(verify.verifyToken,verify.verifyAdmin,validate.validateProduct,catchAsync(product.addProduct));

module.exports = router;