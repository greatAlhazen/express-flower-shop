const router = require('express').Router();
const home = require('../controllers/home');
const getUser = require('../utils/getUser');

router.route('/').get(getUser.jwtVerify,getUser.sendUser,home.homePage);

module.exports = router;
