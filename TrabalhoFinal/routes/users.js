var express = require('express');
var router = express.Router();
var passport = require('passport');

//Passport configuration
require('../controllers/passport')(passport);
router.use(passport.initialize());
router.use(passport.session());

// =========================================================================
// POST /login , uses passport to authenticate user and start session ======
// =========================================================================
router.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
        if (err) {
            return next(err);
        } else {
            if (!user) {
                return res.status(200).json({ logged : false });
            }
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            } else {
                return res.status(200).json({ logged : true });
            }
        });
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
                return res.status(200).json({ logged : false });
            }
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            } else {
                return res.status(200);
            }
        });
    })(req, res, next);
});

// =========================================================================
// GET /profile, loads user data and sends to client =======================
// =========================================================================
router.get('/profile', authMiddleware ,function (req, res, next) {
    var user = req.session.passport.user;
    res.json({user: user});
  });

module.exports = router;

const authMiddleware = function(req,res,next){
    if (!req.isAuthenticated()){
        res.status(401).send("Não está autenticado!");
    }else{
        return next();
    }
}