const router = require('express').Router();
const user = require('../controllers/user');
const verify = require('../utils/verifyToken');
const multer = require('multer');
const { storage } = require('../cloudinary/cloudinary');
const catchAsync = require('../utils/asyncError');
const getUser = require('../utils/getUser');


const upload = multer({ storage: storage});

router.route('/update/:id').get(getUser.jwtVerify,getUser.sendUser,verify.verifyToken,verify.verifyAndAuthorize,user.getUpdatePage)
.put(upload.single('image'),catchAsync(user.postUpdate));

router.route('/delete/:id').delete(verify.verifyToken,verify.verifyAndAuthorize,catchAsync(user.deleteUser));

router.route('/change/:id').get(verify.verifyToken,verify.verifyAndAuthorize,user.changePasswordPage)
.put(user.changePassword);


module.exports = router;