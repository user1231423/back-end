var express = require('express');
var router = express.Router();

//Require controler for user settings
var user_controller = require('../controllers/userController');

//Require image controller
var imgController = require('../controllers/imageController');

// =========================================================================
// GET users/home, loads the home page after login =========================
// =========================================================================
router.get('/home', authMiddleware, user_controller.sendWelcoming);

// =========================================================================
// GET users/profile, loads user data and sends to client ==================
// =========================================================================
router.get('/profile', authMiddleware, user_controller.sendUser);

// =========================================================================
// DELETE users/logout, requests logout user, this clears the session =========
// =========================================================================
router.delete('/logout', authMiddleware, user_controller.userlogout);

// =========================================================================
// GET users/find, finds the user in the table users =======================
/*
    {
        "search": "user2"
    }
*/
// =========================================================================
router.post('/find', authMiddleware, user_controller.findUser);

// =========================================================================
// GET users/person/id, gets another person profile ========================
// =========================================================================
router.post('/person', authMiddleware,user_controller.getProfile);

// =========================================================================
// POST users/image/:id, upload image to server and inserts location on db =
// id is the user id
// =========================================================================
router.post('/image/:id', authMiddleware, imgController.uploadUserImg);

// =========================================================================
// DELETE users/image, deletes current user image ==========================
// =========================================================================
router.delete('/image', authMiddleware, imgController.deleteUserImg);

// =========================================================================
// PUT users/image, updates user image =====================================
// =========================================================================
router.put('/image', authMiddleware, imgController.updateUserImg);

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