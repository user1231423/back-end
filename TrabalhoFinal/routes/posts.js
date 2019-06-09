var express = require('express');
var router = express.Router();

//Require controller for posts
var posts_controller = require('../controllers/postsController');

// =========================================================================
// POST /posts/create, create post =========================================
// =========================================================================
router.post('/create', authMiddleware, posts_controller.createPost);

// =========================================================================
// DELETE /posts/delete, deletes post ======================================
// =========================================================================
router.delete('/delete/:id', authMiddleware, posts_controller.deletePost);

// =========================================================================
// PUT /posts/update, updates post data ====================================
// =========================================================================
router.put('/update/:id', authMiddleware, posts_controller.updatePost);

// =========================================================================
// GET /posts/show, requests current user posts ============================
// =========================================================================
router.get('/show', authMiddleware, posts_controller.userPosts);

// =========================================================================
// GET posts/friends, gets the posts of the current user friends ===========
// =========================================================================
router.get('/friends', authMiddleware, posts_controller.friendsPosts);

// =========================================================================
// PUT posts/likes, increment post likes ===================================
// =========================================================================
router.put('/likes/:id', authMiddleware, posts_controller.postsLikes);

// =========================================================================
// PUT posts/dislikes, increment post dislikes =============================
// =========================================================================
router.put('/dislikes/:id', authMiddleware, posts_controller.postsDislikes);

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