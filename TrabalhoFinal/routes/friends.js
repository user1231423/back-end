var express = require('express');
var router = express.Router();

//Require controller for friends
var friends_controller = require('../controllers/friendsController');

// =========================================================================
// GET /friends/list requests current user posts ============================
// =========================================================================
router.get('/list', authMiddleware, friends_controller.friendList);

// =========================================================================
// GET /friends/search search current user frinds acordind to work given ===
// =========================================================================
router.get('/search', authMiddleware, friends_controller.findFriend);

// =========================================================================
// POST /friends/request sends friend request to another user ===============
// =========================================================================
router.post('/request', authMiddleware, friends_controller.friendRequest);

// =========================================================================
// PUT /friends/request sets the decision to add or not to add friend ======
// =========================================================================
router.put('/decision', authMiddleware, friends_controller.friendDecision);

// =========================================================================
// DELETE /friends/request Deletes friend request ==========================
// =========================================================================
router.delete('/request', authMiddleware, friends_controller.deleteRequest);

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