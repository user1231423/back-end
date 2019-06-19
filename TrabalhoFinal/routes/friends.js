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
/*
    {
        "search": "user2"
    }
*/
// =========================================================================
router.get('/search', authMiddleware, friends_controller.findFriend);

// =========================================================================
// POST /friends/request sends friend request to another user ==============
// id is another user id
// =========================================================================
router.post('/request', authMiddleware, friends_controller.friendRequest);

// =========================================================================
// PUT /friends/decision sets the decision to add or not to add friend =====
/*  -------------- ! Need relation id on params ! --------------------------
    {
        "decision": true
    }
*/
// =========================================================================
router.put('/decision', authMiddleware, friends_controller.friendDecision);

// =========================================================================
// DELETE /friends/request Deletes friend request ==========================
// --------------- ! Need relation id on params ! --------------------------
// =========================================================================
router.post('/request/delete', authMiddleware, friends_controller.deleteRequest);

// =========================================================================
// POST /friends/block blocks user =========================================
// =========================================================================
router.post('/block/:personID', authMiddleware, friends_controller.blockPerson);

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

// =========================================================================
// POST /friends/friendlist gets a list of a person friends ================
// =========================================================================
router.post('/friendlist', authMiddleware, friends_controller.personFriendList);

// =========================================================================
// POST /friends/person/followers gets a list of all persons following =====
// =========================================================================
router.post('/person/followers', authMiddleware, friends_controller.personFollowers);

// =========================================================================
// POST /friends/followers gets a list of all followers of the current user=
// =========================================================================
router.get('/followers', authMiddleware, friends_controller.userFollowers);

// =========================================================================
// POST /friends/check/follow checks if user is following another ==========
// =========================================================================
router.post('/check/follow', authMiddleware, friends_controller.checkFriendship);

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