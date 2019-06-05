var express = require('express');
var router = express.Router();

// =========================================================================
// GET /, main route =======================================================
// =========================================================================
router.get('/', function(req, res, next) {
    console.log(req.user);
    if (req.user) {
        res.json({
            logged: true
        })
    } else {
        res.json({
            logged: false
        })
    }
});

// =========================================================================
// GET /home, loads the home page after login ==============================
// =========================================================================
router.get('/home', function(req, res, next) {
    res.json({
        message: "Welcome Home after login!"
    })
});

// =========================================================================
// GET /profile, loads user data and sends to client =======================
// =========================================================================
router.get('/profile', authMiddleware, function(req, res, next, ) {
    res.json({ user: req.user });
});

// =========================================================================
// GET /logout, requests logout user, this clears the session ==============
// =========================================================================
router.get('/logout', authMiddleware, function(req, res, next) {
    req.logOut();
    res.json({
        logged: false
    });
});

module.exports = router;

//Check if user is authenticated
function authMiddleware(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).send("Não está autenticado!");
    }
};