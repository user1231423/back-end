var express = require('express');
var router = express.Router();

//Require controller for friends
var friends_controller = require('../controllers/friendsController');

// =========================================================================
// GET /friends/list requests current user posts ===========================
// =========================================================================
router.get('/list', authMiddleware, friends_controller.friendList);

// =========================================================================
// GET /friends/search search current user frinds acordind to word given ===
// =========================================================================
router.get('/search', authMiddleware, friends_controller.findFriend);

// =========================================================================
// POST /friends/request sends friend request to another user ==============
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

// =========================================================================
// POST /friends/block blocks user =========================================
// =========================================================================
router.post('/block', authMiddleware, friends_controller.blockPerson);

// =========================================================================
// GET /friends/blocklist list of blocked users ============================
// =========================================================================
router.get('/blocklist', authMiddleware, friends_controller.blockList);

// =========================================================================
// GET /friends/requests gets a list of friend request received ============
// =========================================================================
router.get('/requests', authMiddleware, friends_controller.receivedRequests);

// =========================================================================
// GET /friends/sentrequests gets a list of sent friend requests ===========
// =========================================================================
router.get('/sentrequests', authMiddleware, friends_controller.sentRequests);

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