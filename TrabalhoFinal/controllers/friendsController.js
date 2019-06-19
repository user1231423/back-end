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
    //This query will return the list of friends to the current user
    var sql = "SELECT users.user_id, users.nome, users.contacto, users.data_nasc, imagem_user.caminho FROM users LEFT JOIN imagem_user ON imagem_user.user_id = users.user_id INNER JOIN relations on users.user_id = relations.user_2 AND relations.status = 2 WHERE relations.user_1 = " + id;
    connection.query(sql, function(error, results, fields) {
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

//Search friend
exports.findFriend = function(req, res) {
    var id = req.user.user_id;
    //This query will return all users that are friend to the current user
    var sql = "SELECT users.user_id, users.nome, users.contacto, users.data_nasc, imagem_user.caminho FROM users LEFT JOIN imagem_user ON imagem_user.user_id = users.user_id INNER JOIN relations on users.user_id = relations.user_2 AND relations.status = 2 WHERE relations.user_1 = " + id;
    connection.query(sql, function(error, results, fields) {
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
    var secondUser = req.params.id;
    if (!secondUser) {
        res.send("No friend id was sent!");
    } else {
        if (id == secondUser) {
            res.send("Can't add yourself!");
        } else {
            var sql = "SELECT users.user_id, users.nome, users.contacto, users.data_nasc, imagem_user.caminho FROM users LEFT JOIN imagem_user ON imagem_user.user_id = users.user_id INNER JOIN relations on users.user_id = relations.user_2 AND relations.status = 1 WHERE relations.user_1 = ? AND relations.user_2 = ?";
            connection.query(sql, [id, secondUser], function(error, results, fields) {
                if (error) {
                    res.send(error);
                } else {
                    if (results.length == 0) {
                        var sql = "SELECT users.user_id, users.nome, users.contacto, users.data_nasc, imagem_user.caminho FROM users LEFT JOIN imagem_user ON imagem_user.user_id = users.user_id INNER JOIN relations on users.user_id = relations.user_2 AND relations.status = 2 WHERE relations.user_1 = ? AND relations.user_2 = ?";
                        connection.query(sql, [id, secondUser], function(error, results, fields) {
                            if (error) {
                                res.send(error);
                            } else {
                                if (results.length == 0) {
                                    //Insert data into the table relations setting relation as sen't friend request
                                    var sql = "INSERT INTO relations SET status = ?, user_1 = ?, user_2 = ?";
                                    connection.query(sql, [1, id, secondUser], function(error, results, fields) {
                                        if (error) {
                                            res.send(error);
                                        } else {
                                            res.json(results.insertId);
                                        }
                                    });
                                } else {
                                    res.send("Alreday friends!");
                                }
                            }
                        });
                    } else {
                        res.send("Request already sent!");
                    }
                }
            });
        }
    }
}

//Friend decision, this is the user deciding to accept or not the friend request
exports.friendDecision = function(req, res) {
    var decision = req.body.decision; //True or false
    var requestID = req.params.id;
    var id = req.user.user_id;
    if ((decision == undefined) || (decision.length == 0) || (!requestID)) {
        res.send("Need more data!");
    } else {
        var sql = "SELECT * FROM relations WHERE relation_id = ? AND user_2 = ?";
        connection.query(sql, [requestID, id], function(error, results, fields) { //Execute query to select * from relations with relation_id that we got from the client
            if (error) {
                res.send(error);
            } else {
                if (results.length == 0) {
                    res.send("No relation with given id!");
                } else {
                    if ((results[0].status == 2) || (results[0].status == 3) || (results[0].status == 4)) {
                        res.send("Already decided!");
                    } else {
                        if (decision == true) {
                            //Makes friend who sent friend to the one who received
                            var sql = "UPDATE relations SET status = 2 WHERE relation_id = " + requestID;
                            connection.query(sql, function(error, results, fields) {
                                if (error) {
                                    res.send(error);
                                } else {
                                    res.json({
                                        friends: true
                                    });
                                }
                            });
                        } else {
                            //Set request as denied
                            var sql = "UPDATE relations SET status = 3 WHERE relation_id = " + requestID;
                            connection.query(sql, function(error, results, fields) {
                                if (error) {
                                    res.send(error);
                                } else {
                                    res.json({
                                        friends: false
                                    });
                                }
                            });
                        }
                    }
                }
            }
        });
    }
}

//Delete friend request or blocked friend or frienship
exports.deleteRequest = function(req, res) {
    var request = req.params.id;
    if (!request) {
        res.send("No request id was sent!");
    } else {
        //Check if there is any relation with the given id
        var sql = "SELECT * FROM relations WHERE relation_id = " + request;
        connection.query(sql, function(error, results, fields) {
            if (error) {
                res.send(error);
            } else {
                if (results.length == 0) {
                    res.send("There is relation with the given id!");
                } else {
                    //if there is a relation then we will delete her
                    var sql = "DELETE FROM relations WHERE relation_id = " + request;
                    connection.query(sql, function(error, results, fields) {
                        if (error) {
                            res.send(error);
                        } else {
                            res.json(results.affectedRows);
                        }
                    });
                }
            }
        });
    }
}

//Block one user
exports.blockPerson = function(req, res) {
    var personID = req.params.personID;
    var id = req.user.user_id;
    if (!personID) {
        res.send("No id was sent!");
    } else {
        if (personID == id) {
            res.send("Can't block yourself!");
        } else {
            //Check if the user is already blocked
            var sql = "SELECT * FROM relations WHERE user_1 = ? AND user_2 = ? AND status = 4";
            connection.query(sql, [id, personID], function(error, results, fields) {
                if (error) {
                    res.send(error);
                } else {
                    if (results.length != 0) {
                        res.send("User Already blocked!");
                    } else {
                        //Delete relations beteen current user and the users he is blocking
                        var sql = "DELETE FROM relations WHERE user_1 = ? AND user_2 = ?";
                        connection.query(sql, [id, personID, 2], function(error, results, fields) {
                            if (error) {
                                res.send(error);
                            } else {
                                //Delete the user he is blocking and the current user relation
                                var sql = "DELETE FROM relations WHERE user_1 = ? AND user_2 = ?";
                                connection.query(sql, [personID, id], function(error, results, fields) {
                                    if (error) {
                                        res.send(error);
                                    } else {
                                        //Insert blocked relation between users
                                        var sql = "INSERT INTO relations SET status = ?, user_1 = ?, user_2 = ?";
                                        connection.query(sql, [4, id, personID], function(error, results, fields) {
                                            if (error) {
                                                res.send(error);
                                            } else {
                                                res.json(results.insertId);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
    }
}

//Get the list of blocked users by the current user
exports.blockList = function(req, res) {
    var id = req.user.user_id;
    //join info from table users and table relations to get the list of users blocked
    var sql = "SELECT users.user_id, users.nome, users.contacto, users.data_nasc, imagem_user.caminho FROM users LEFT JOIN imagem_user ON imagem_user.user_id = users.user_id INNER JOIN relations on users.user_id = relations.user_2 AND relations.status = 4 WHERE relations.user_1 = " + id;
    connection.query(sql, function(error, results, fields) {
        if (results.length == 0) {
            res.send("No blocked users");
        } else {
            res.json(results);
        }
    });
}

//Gets the list of friend request sen't to the current user
exports.receivedRequests = function(req, res) {
    var id = req.user.user_id;
    //Join data from talbe users and relations to return the users that sent the current user friend requests
    var sql = "SELECT users.user_id, users.nome, users.contacto, users.data_nasc, imagem_user.caminho FROM users LEFT JOIN imagem_user ON imagem_user.user_id = users.user_id INNER JOIN relations on users.user_id = relations.user_1 AND relations.status = 1 WHERE relations.user_2 = " + id;
    connection.query(sql, function(error, results, fields) {
        if (error) {
            res.send(error);
        } else {
            //If results lenght is 0 means the users didn't received any friend request
            if (results.length == 0) {
                res.send("No requests received!");
            } else {
                res.json(results);
            }
        }
    });
}

//Gets the list of the current user sent friend requests
exports.sentRequests = function(req, res) {
    var id = req.user.user_id;
    //Join data from talbe users and relations to return the users to who the current user sen't friend requests
    var sql = "SELECT users.user_id, users.nome, users.contacto, users.data_nasc, imagem_user.caminho FROM users LEFT JOIN imagem_user ON imagem_user.user_id = users.user_id INNER JOIN relations on users.user_id = relations.user_2 AND relations.status = 1 WHERE relations.user_1 = " + id;
    connection.query(sql, function(error, results, fields) {
        if (error) {
            res.send(error);
        } else {
            //If results lenght is 0 means he user didn't sent any request
            if (results.length == 0) {
                res.send("No requests sent!");
            } else {
                res.json(results);
            }
        }
    });
}

exports.personFriendList = function(req, res) {
    var id = req.body.id;
    //This query will return the list of friends to the current user
    var sql = "SELECT users.user_id, users.nome, users.contacto, users.data_nasc, imagem_user.caminho FROM users LEFT JOIN imagem_user ON imagem_user.user_id = users.user_id INNER JOIN relations on users.user_id = relations.user_2 AND relations.status = 2 WHERE relations.user_1 = " + id;
    connection.query(sql, function(error, results, fields) {
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