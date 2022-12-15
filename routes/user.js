const router = require('express').Router();
const user = require('../controllers/user');
const verify = require('../utils/verifyToken');

router.route('/update/:id').get(verify.verifyToken,verify.verifyAndAuthorize,user.getUpdatePage);


module.exports = router;