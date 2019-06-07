var express = require('express');
var router = express.Router();

//Require controller for posts
var posts_controller = require('../controllers/postsController');

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