var express = require('express');
var router = express.Router();

//Require controller for posts
var posts_controller = require('../controllers/postsController');

//Require image controller
var imgController = require('../controllers/imageController');

// =========================================================================
// POST /posts/create, create post =========================================
/*
    {
        "title": "title",
        "desc": "desc"
    }
*/
// =========================================================================
router.post('/create', authMiddleware, posts_controller.createPost);

// =========================================================================
// DELETE /posts/delete, deletes post ======================================
// id is the post id
// =========================================================================
router.post('/delete', authMiddleware, posts_controller.deletePost);

// =========================================================================
// PUT /posts/update/:id, updates post data ================================
/* id is the post id
    {
        "title": "title",
        "desc": "desc"
    }
*/
// =========================================================================
router.put('/update', authMiddleware, posts_controller.updatePost);

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
// id is the post id
// =========================================================================
router.put('/likes', authMiddleware, posts_controller.postsLikes);

// =========================================================================
// PUT posts/dislikes, increment post dislikes =============================
// id is the psot id
// =========================================================================
router.put('/dislikes', authMiddleware, posts_controller.postsDislikes);

// =========================================================================
// POST posts/image/:id, upload image to server and inserts location on db =
// id is the post id
// =========================================================================
router.post('/image/:id', authMiddleware, imgController.uploadPostImg);

// =========================================================================
// DELETE posts/image/:id, deletes post image ==============================
// id is the post id
// =========================================================================
router.delete('/image/:id', authMiddleware, imgController.deletePostImg);

// =========================================================================
// POST posts/info, gets all info about one post ===========================
// =========================================================================
router.post('/info', authMiddleware, posts_controller.postInfo);

// =========================================================================
// POST posts/info, gets posts of one person ===============================
// =========================================================================
router.post('/person', authMiddleware, posts_controller.personPosts);

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