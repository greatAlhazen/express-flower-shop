const router = require('express').Router();
const { homePage } = require('../controllers/home');

router.route('/').get(homePage);

module.exports = router;
