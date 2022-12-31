const router = require('express').Router();
const product = require('../controllers/product');
const catchAsync = require('../utils/asyncError');
const verify = require('../utils/verifyToken');
const validate = require('../middleware.js');
const multer = require('multer');
const { storage } = require('../cloudinary/cloudinary');
const getUser = require('../utils/getUser');
const getProduct = require('../utils/getProduct');

const upload = multer({ storage: storage});

router.route('/add').post(
    verify.verifyToken,
    verify.verifyAdmin,
    validate.validateProduct,
    upload.single('product[file]'),
    catchAsync(product.addProduct));

router.route('/products').get(
    getUser.jwtVerify,
    getUser.sendUser,
    catchAsync(getProduct),
    product.getProducts,
)

router.route('/update/:id').get(
    verify.verifyToken,
    verify.verifyAdmin,
    catchAsync(product.updateProductPage),
).put(
    verify.verifyToken,
    verify.verifyAdmin,
    validate.validateProduct,
    upload.single('product[file]'),
    catchAsync(product.updateProduct),
)

module.exports = router;