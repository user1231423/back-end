var express = require('express');
var router = express.Router();

//Require loggedController
var logged_controller = require('../controllers/loggedController');

// =========================================================================
// GET /home, loads the home page after login ==============================
// =========================================================================
router.get('/home', authMiddleware, logged_controller.sendWelcoming);

// =========================================================================
// GET /profile, loads user data and sends to client =======================
// =========================================================================
router.get('/profile', authMiddleware, logged_controller.sendUser);

// =========================================================================
// GET /logout, requests logout user, this clears the session ==============
// =========================================================================
router.get('/logout', authMiddleware, logged_controller.userlogout);

// =========================================================================
// POST /posts/create, create post =========================================
// =========================================================================
router.post('/posts/create', authMiddleware, logged_controller.createPost);

// =========================================================================
// DELETE /posts/delete, deletes post by id ================================
// =========================================================================
router.delete('/posts/delete', authMiddleware, logged_controller.deletePost);

// =========================================================================
// PUT /posts/update, updates post data ====================================
// =========================================================================
router.put('/posts/update', authMiddleware, logged_controller.updatePost);

// =========================================================================
// GET /chat, !!!!!!!!!!!!!!!!!! NOT MADE YET !!!!!!!!!!!!!!!!!!!!!! =======
// =========================================================================
router.get('/chat', authMiddleware);

// =========================================================================
// GET /logout, requests logout user, this clears the session ==============
// =========================================================================
router.get('/posts/show', authMiddleware, );

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