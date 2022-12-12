const router = require('express').Router();
const auth = require('../controllers/auth');

router.route('/register').get(auth.getRegister)
.post(auth.postRegister);

router.route('/login').get(auth.getlogin)
.post(auth.postLogin);

module.exports = router;
