var connection = require('../assets/db/connect');

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

//Find user in the table users
exports.findUser = function(req,res){
    var sql = "SELECT * FROM users";
    connection.query(sql, function (error, results, fields) { 
        if (error) {
            res.send(error);
        } else {
            if (results.length == 0) {
                res.send("No users in database!");
            } else {
                var word = req.body.search;
                var retornar = [];
                for (var i = 0; i < results.length; i++){
                    if(results[i].nome == word){
                        retornar.push(results[i]);
                    }
                }
                if(retornar.length == 0){
                    res.send("No results!");
                }else{
                    res.json(retornar);
                }
            }
        }
    });
}

//Requests logout and after it sends a json with variable logged set as false
exports.userlogout = function(req, res) {
    req.logOut();
    res.json({
        isLoggedOut: true
    });
}

//Get profile to another user
exports.getProfile = function(req,res){
    var id = req.params.id;
    var sql = "SELECT * FROM users WHERE user_id = " + id;
    connection.query(sql, function(error,results,fields){
        if (error){
            res.send(error);
        }else{
            if(results.length == 0){
                res.send("No user with given id!");
            }else{
                res.json(results[0]);
            }
        }
    });
}