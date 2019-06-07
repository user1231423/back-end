var express = require('express');
var router = express.Router();
var passport = require('passport');

// =========================================================================
// POST /login , uses passport to authenticate user and start session ======
// =========================================================================
router.post('/login', function(req, res, next) {
    if ((!req.body.email) || (!req.body.password)) {
        return res.send("Error, need more information!");
    } else {
        passport.authenticate('local-login', function(err, user, info) {
            if (err) {
                return next(err);
            } else {
                if (!user) {
                    return res.json({
                        logged: false
                    });
                } else {
                    req.login(user, (err) => {
                        return res.json({
                            logged: true
                        });
                    })
                }
            }
        })(req, res, next);
    }
});

// =========================================================================
// POST /signup , uses passport to sign up user ============================
// =========================================================================
router.post('/signup', function(req, res, next) {
    if ((!req.body.email) || (!req.body.password) || (!req.body.contacto) || (!req.body.name) || (!req.body.data_nasc)) {
        return res.send("Error, need more information!");
    } else {
        passport.authenticate('local-signup', function(err, user, info) {
            if (err) {
                return next(err);
            } else {
                if (!user) {
                    return res.json({ isRegisted: false });
                } else {
                    return res.json({ isRegisted: true });
                }
            }
        })(req, res, next);
    }
});

module.exports = router;