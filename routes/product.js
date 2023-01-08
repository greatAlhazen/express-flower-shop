const router = require('express').Router();
const product = require('../controllers/product');
const catchAsync = require('../utils/asyncError');
const verify = require('../utils/verifyToken');
const validate = require('../middleware.js');
const multer = require('multer');
const { storage } = require('../cloudinary/cloudinary');
const getUser = require('../utils/getUser');
const getProduct = require('../utils/getProduct');

//config image upload
const upload = multer({ storage: storage});

//add product
router.route('/add').post(
    verify.verifyToken,
    verify.verifyAdmin,
    validate.validateProduct,
    upload.single('product[file]'),
    catchAsync(product.addProduct));

//get all products
router.route('/products').get(
    getUser.jwtVerify,
    catchAsync(getUser.sendUser),
    catchAsync(getProduct),
    product.getProducts,
)

//update product
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

//delete product
router.route('/delete/:id').delete(
    verify.verifyToken,
    verify.verifyAdmin,
    catchAsync(product.deleteProduct),
)

//get single product
router.route('/singleProduct/:id').get(
    getUser.jwtVerify,
    catchAsync(getUser.sendUser),
    catchAsync(getProduct),
    product.getProduct,
)

module.exports = router;