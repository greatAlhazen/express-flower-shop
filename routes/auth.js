const router = require('express').Router();
const auth = require('../controllers/auth');

router.route('/register').get(auth.getRegister)
.post(auth.postRegister);

router.route('/login').get(auth.getlogin)
.post(auth.postLogin);

router.route('/logout').post(auth.logout);

module.exports = router;
