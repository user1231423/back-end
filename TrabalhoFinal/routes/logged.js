var express = require('express');
var router = express.Router();

//Require controler for user settings
var user_controller = require('../controllers/userController');

//Require controller for posts
var posts_controller = require('../controllers/postsController');


//Require controller for friends
var friends_controller = require('../controllers/friendsController');

// =========================================================================
// GET /home, loads the home page after login ==============================
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
// POST /posts/create, create post =========================================
// =========================================================================
router.post('/posts/create', authMiddleware, posts_controller.createPost);

// =========================================================================
// DELETE /posts/delete, deletes post ======================================
// =========================================================================
router.delete('/posts/delete', authMiddleware, posts_controller.deletePost);

// =========================================================================
// PUT /posts/update, updates post data ====================================
// =========================================================================
router.put('/posts/update', authMiddleware, posts_controller.updatePost);

// =========================================================================
// GET /posts/show, requests current user posts ============================
// =========================================================================
router.get('/posts/show', authMiddleware, posts_controller.userPosts);

// =========================================================================
// GET /friends/list requests current user posts ============================
// =========================================================================
router.get('/friends/list', authMiddleware, friends_controller.friendList);

// =========================================================================
// GET /friends/search search current user frinds acordind to work given ===
// =========================================================================
router.get('/friends/search', authMiddleware, friends_controller.findFriend);

// =========================================================================
// POST /friends/request sends friend request to another user ===============
// =========================================================================
router.post('/friends/request', authMiddleware, friends_controller.friendRequest);

// =========================================================================
// PUT /friends/request sets the decision to add or not to add friend ======
// =========================================================================
router.put('/friends/decision', authMiddleware, friends_controller.friendDecision);


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