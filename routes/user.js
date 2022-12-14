const router = require('express').Router();
const user = require('../controllers/user');

router.route('/update').get(user.getUpdatePage);


module.exports = router;