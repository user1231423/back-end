var connection = require('../assets/db/connect');
// =======================How the table relations works ===================================================================
// the fieled status of the table means:
// 1- Friend request sent
// 2- They are fiends
// 3- Rejected friend request
// 4- Blocked
// This relation is always from user 1 to user 2 meaning that if there is user 1 = 10 and user 2 = 20 user 1 added user 20
// ========================================================================================================================

//Get the friend list for current user
exports.friendList = function(req, res) {
    var id = req.user.user_id;
    var sql = "SELECT users.user_id, users.nome, users.data_nasc FROM relations INNER JOIN users ON users.user_id = relations.user_2 AND relations.user_1 = " + id;
    connection.query(sql, function(error, results, fields) { //Execute sql query and add data into the table posts
        if (error) {
            res.send(error);
        } else {
            if (results.length == 0) {
                res.send("No friends!");
            } else {
                res.json(results);
            }
        }
    });
}

//Search frind in 
exports.findFriend = function(req, res) {
    var id = req.user.user_id;
    var sql = "SELECT users.user_id, users.nome, users.data_nasc FROM relations INNER JOIN users ON users.user_id = relations.user_2 AND relations.user_1 = " + id;
    connection.query(sql, function(error, results, fields) { //Execute sql query and add data into the table posts
        if (error) {
            res.send(error);
        } else {
            if (results.length == 0) {
                res.send("No friends!");
            } else {
                var word = req.body.search;
                var retornar = [];
                //Loop the array of objects we got from the query
                for (var i = 0; i < results.length; i++) {
                    if (results[i].nome == word) { //If there is a match save the current object to retornar array
                        retornar.push(results[i]);
                    }
                }
                if (retornar.length == 0) { //if retornar length is 0 means there is no results to return
                    res.send("0 matches!");
                } else {
                    res.json(retornar); //return the array with results
                }
            }
        }
    });
}

//Friend request from session user to another user
exports.friendRequest = function(req, res) {
    var id = req.user.user_id;
    var secondUser = req.body.friendID;
    if (!secondUser) {
        res.send("No friend id was sent!");
    } else {
        var sql = "INSERT INTO relations SET status = ?, user_1 = ?, user_2 = ?";
        connection.query(sql, [1, id, secondUser], function(error, results, fields) { //Execute sql query and add data into the table posts
            if (error) {
                res.send(error);
            } else {
                res.json(results.insertId);
            }
        });
    }
}

//Friend request from session user to another user
exports.friendDecision = function(req, res) {
    var id = req.user.user_id;
    var decision = req.body.decision;
    var requestID = req.body.request;
    if ((!decision) || (!requestID)) {
        res.send("Need more data!");
    } else {
        var sql = "SELECT * FROM relations WHERE relation_id =" + requestID;
        connection.query(sql, function(error, results, fields) { //Execute sql query and add data into the table posts
            if (error) {
                res.send(error);
            } else {
                if (results.length == 0) {
                    res.send("No relation with given id!");
                } else {
                    if (decision == true) {
                        var sql = "UPDATE relations SET status = 2 WHERE relation_id = " + requestID;
                        connection.query(sql, function(error, results, fields) { //Execute sql query and add data into the table posts
                            if (error) {
                                res.send(error);
                            } else {
                                res.json(results);
                            }
                        });
                    } else {
                        var sql = "UPDATE relations SET status = 3 WHERE relation_id = " + requestID;
                        connection.query(sql, function(error, results, fields) { //Execute sql query and add data into the table posts
                            if (error) {
                                res.send(error);
                            } else {
                                res.json(results);
                            }
                        });
                    }
                }
            }
        });
    }
}