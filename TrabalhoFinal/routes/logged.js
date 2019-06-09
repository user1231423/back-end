var express = require('express');
var router = express.Router();

//Require controler for user settings
var user_controller = require('../controllers/userController');

// =========================================================================
// GET /home, loads the home page after login =========================
// =========================================================================
router.get('/home', authMiddleware, user_controller.sendWelcoming);

// =========================================================================
// GET /profile, loads user data and sends to client =======================
// =========================================================================
router.get('/profile', authMiddleware, user_controller.sendUser);

// =========================================================================
// GET /logout, requests logout user, this clears the session ==============
// =========================================================================
router.get('/logout', authMiddleware, user_controller.userlogout);

// =========================================================================
// GET /find, finds the user in the table users ============================
/*
    {
        "search": "user2"
    }
*/
// =========================================================================
router.get('/find', authMiddleware, user_controller.findUser);

// =========================================================================
// GET /person/id, gets another person profile =============================
// =========================================================================
router.get('/person/:id', authMiddleware, user_controller.getProfile);

module.exports = router;

//Check if user is authenticated
function authMiddleware(req, res, next) {
    if (req.isAuthenticated()) {
        //It means user is authenticated so he can go through
        return next();
    } else {
        res.status(401).send("Não está autenticado!"); //Send 401 status, not unauthorized request and some text about the error
    }
};