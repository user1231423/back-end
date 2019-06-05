var express = require('express');
var router = express.Router();
var passport = require('passport');

//Passport configuration
require('../controllers/passport')(passport);
router.use(passport.initialize());
router.use(passport.session());

/* GET profile request, only allows to visit if user is authenticated */
router.get('/profile', isLoggedIn, function(req, res, next) {});

/* POST login request, uses passport to authenticate user and start session*/
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

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't send response
    res.send('Login First');
}