var express = require('express');
var router = express.Router();
var passport = require('passport');

// =========================================================================
// POST /login , uses passport to authenticate user and start session ======
// =========================================================================
router.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
        if (err) {
            return next(err);
        } else {
            if (!user) {
                return res.json({ logged: false });
            } else {
                req.login(user, (err) => {
                    console.log('is authenticated?: ' + req.isAuthenticated());
                    return res.json({
                        logged: true
                    });
                    //return res.status(200).json({ logged: true });
                })
            }
        }
    })(req, res, next);
});

// =========================================================================
// POST /signup , uses passport to sign up user ============================
// =========================================================================
router.post('/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
        if (err) {
            return next(err);
        } else {
            if (!user) {
                return res.status.json({ logged: false });
            } else {
                return res.status.json({ logged: true });
            }
        }
    })(req, res, next);
});

module.exports = router;