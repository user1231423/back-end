var express = require('express');
var router = express.Router();
var passport = require('passport');

//Passport configuration
require('../controllers/passport')(passport);
router.use(passport.initialize());
router.use(passport.session());

/* GET users listing. */
router.get('/', function(req, res, next) {});

router.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
        if (err) {
            return next(err);
        } else {
            if (!user) {
                return res.redirect('/login');
            }
        }
        req.logIn(user, function(err) {
            console.log(user);
            if (err) {
                return next(err);
            } else {
                return res.status(200).json({ logged: true });
            }
        });
    })(req, res, next);
});

module.exports = router;