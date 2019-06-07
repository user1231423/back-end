//Request user and sends it as json to client
exports.sendUser = function(req, res, next) {
    res.json({
        user: req.user
    });
}

//Sends a simple message as json to clients
exports.sendWelcoming = function(req, res) {
    res.json({
        message: "Welcome Home after login!"
    })
}

//Requests logout and after it sends a json with variable logged set as false
exports.userlogout = function(req, res) {
    req.logOut();
    res.json({
        isLoggedOut: true
    });
}