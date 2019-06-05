var express = require('express');
var router = express.Router();

// =========================================================================
// GET /, main route =======================================================
// =========================================================================
router.get('/', function(req, res, next) {
    res.json({
        logged: true
    })
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

module.exports = router;

//Check if user is authenticated
function authMiddleware(req, res, next) {
    console.log("user: ", req.user);
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).send("Não está autenticado!");
    }
};