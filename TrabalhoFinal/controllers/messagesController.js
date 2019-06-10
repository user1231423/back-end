var connection = require('../assets/db/connect');

//send a message to another friend
exports.createMessage = function (req, res) {
    var destination = req.params.id;
    var sender = req.user.user_id;
    var message = req.body.message;
    if ((!destination) || (!sender) || (!message) || (message.length < 1)) {
        res.send("Need more info!");
    } else {
        //Can only send messages to friends
        var sql = "SELECT users.user_id, users.nome, users.data_nasc FROM relations INNER JOIN users ON users.user_id = relations.user_2 AND relations.status = 2 AND relations.user_1 = " + sender;
        connection.query(sql, function (error, results, fields) {
            if (error) {
                res.send(error);
            } else {
                if (results.length == 0) {
                    res.send("You have no friends to send messages!");
                } else {
                    var canSend = false;
                    //loop results to find if destination is a friend to the user
                    for (var i = 0; i < results.length; i++) {
                        if (results[i].user_id == destination) {
                            canSend = true;
                            break;
                        }
                    }
                    //send the message
                    if (canSend) {
                        var date = new Date();
                        //Get date and time to insert on database
                        var time = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                        var sql = "INSERT INTO messages SET sender_id = ?, recipient_id = ?, body = ?, date = ?";
                        connection.query(sql, [sender, destination, message, time], function (error, results, fields) {
                            if (error) {
                                res.send(error);
                            } else {
                                res.json(results.insertId);
                            }
                        });
                    } else {
                        res.send("You are not friends!");
                    }
                }
            }
        });
    }
}

//Delete messages sent
exports.deleteMessage = function (req, res) {
    var messageID = req.params.id;
    var userID = req.user.user_id;
    if (!messageID) {
        res.send("Need more info!");
    } else {
        //user can only delete messages he sent
        sql = "SELECT * FROM messages WHERE sender_id = " + userID;
        connection.query(sql, function (error, results, fields) {
            if (error) {
                res.send(error);
            } else {
                if (results.length == 0) {
                    res.send("No messages to delete");
                } else {
                    //Loop results to find the message to delete
                    var canDelete = false;
                    for (var i = 0; i < results.length; i++) {
                        if (results[i].message_id == messageID) {
                            canDelete = true;
                            break;
                        }
                    }
                    //delete the message
                    if (canDelete) {
                        var sql = "DELETE FROM messages WHERE message_id = " + messageID;
                        connection.query(sql, function (error, results, fields) {
                            if (error) {
                                res.send(error);
                            } else {
                                res.json(results.affectedRows);
                            }
                        });
                    } else {
                        res.send("The message is not yours!");
                    }
                }
            }
        });
    }
}

//List of messages sent
exports.messagesSent = function (req, res) {
    var userID = req.user.user_id;
    if (!userID) {
        res.send("Need more info!");
    } else {
        //Select messages sent by actual user and image of the user he sen't it to
        var sql = "SELECT messages.*, imagem_user.caminho AS img_recipient FROM messages INNER JOIN users ON users.user_id = messages.sender_id LEFT JOIN imagem_user ON imagem_user.user_id = messages.recipient_id WHERE users.user_id = " + userID;
        connection.query(sql, function (error, results, fields) {
            if (error) {
                res.send(error);
            } else {
                if (results.length == 0) {
                    res.send("No messages sent!");
                } else {
                    var retornar = results;
                    //select actual user image to send in the response
                    var sql = "SELECT caminho FROM imagem_user WHERE imagem_user_id = " + userID;
                    connection.query(sql, function (error, results, fields) {
                        if (error) {
                            res.send(error);
                        } else {
                            //if user has no image send field as null
                            if (results.length == 0) {
                                for (var i = 0; i < retornar.length; i++) {
                                    retornar[i].img_sender = null;
                                }
                                res.json(retornar);
                            } else {
                                //if he has image send the result from database
                                for (var i = 0; i < retornar.length; i++) {
                                    retornar[i].img_sender = results[0].caminho;
                                }
                                res.json(retornar);
                            }
                        }
                    })
                }
            }
        });
    }
}

//received messages
exports.receivedMessages = function (req, res) {
    var userID = req.user.user_id;
    if (!userID) {
        res.send("Need more info!");
    } else {
        //Select messages sent by actual user and image of the user he sen't it to
        var sql = "SELECT messages.*, imagem_user.caminho AS img_sender FROM messages INNER JOIN users ON users.user_id = messages.sender_id LEFT JOIN imagem_user ON imagem_user.user_id = users.user_id WHERE messages.recipient_id = " + userID;
        connection.query(sql, function (error, results, fields) {
            if (error) {
                res.send(error);
            } else {
                if (results.length == 0) {
                    res.send("No messages received!");
                } else {
                    var retornar = results;
                    //select actual user image to send in the response
                    var sql = "SELECT caminho FROM imagem_user WHERE imagem_user_id = " + userID;
                    connection.query(sql, function (error, results, fields) {
                        if (error) {
                            res.send(error);
                        } else {
                            //if user has no image send field as null
                            if (results.length == 0) {
                                for (var i = 0; i < retornar.length; i++) {
                                    retornar[i].img_recipient = null;
                                }
                                res.json(retornar);
                            } else {
                                //if he has image send the result from database
                                for (var i = 0; i < retornar.length; i++) {
                                    retornar[i].img_recipient = results[0].caminho;
                                }
                                res.json(retornar);
                            }
                        }
                    })
                }
            }
        });
    }
}