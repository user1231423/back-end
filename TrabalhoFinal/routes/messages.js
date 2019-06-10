var express = require('express');
var router = express.Router();

//Require controller for posts
var messageController = require('../controllers/messagesController');

// ===========================================================================
// POST /message/new/:id, create new message =================================
/* id is the destination user id
    {
        "message": "hello"
    }
*/
// ===========================================================================
router.post('/new/:id', authMiddleware, messageController.createMessage);

// ===========================================================================
// DELETE /message/delete/:id, create new message ============================
/* id is the message id
    {
        "message": "hello"
    }
*/
// ===========================================================================
router.delete('/delete/:id', authMiddleware, messageController.deleteMessage);

// ===========================================================================
// GET /message/sent, see all messages sent ==================================
// ===========================================================================
router.get('/sent', authMiddleware, messageController.messagesSent);

// ===========================================================================
// GET /message/received, see all messages sent ==================================
// ===========================================================================
router.get('/received', authMiddleware, messageController.receivedMessages);

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