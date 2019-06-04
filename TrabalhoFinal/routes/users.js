var express = require('express');
var router = express.Router();
var passport = require('passport');

require('../controllers/passport')(passport); //Passport configuration
router.use(passport.initialize());
router.use(passport.session());

/* GET users listing. */
router.get('/', function(req, res, next) {
});

module.exports = router;
