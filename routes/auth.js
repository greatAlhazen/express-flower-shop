const router = require('express').Router();
const auth = require('../controllers/auth');

router.route('/register').get(auth.getRegister);

router.route('/login').get(auth.getlogin);

module.exports = router;
