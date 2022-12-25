const router = require('express').Router();
const product = require('../controllers/product');
const catchAsync = require('../utils/asyncError');
const verify = require('../utils/verifyToken');
const validate = require('../middleware.js');
const multer = require('multer');
const { storage } = require('../cloudinary/cloudinary');

const upload = multer({ storage: storage});

router.route('/add').post(verify.verifyToken,verify.verifyAdmin,validate.validateProduct,upload.single('product[file]'),catchAsync(product.addProduct));

module.exports = router;