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

//Requests logout and after it sends a json with variable logged set as false
exports.userlogout = function(req, res) {
    req.logOut();
    res.json({
        logged: false
    });
}

//Gets the data sent from the client side and inserts it into the database on the table posts
exports.createPost = function(req, res) {
    var data = req.body;
    //Request current user id
    var id = req.user.user_id;
    if ((!data.title) || (!data.desc) || (data.title.length == 0) || (data.desc.length == 0) || (!id)) {
        res.send("No data sent");
    } else {
        var date = new Date();
        //Get date and time to insert on database
        var time = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        var sql = "INSERT INTO posts SET title = ?, description = ?, date = ?, user_id = ?, likes = 0, dislikes = 0";
        connection.query(sql, [data.title, data.desc, time, id], function(error, results, fields) { //Execute sql query and add data into the table posts
            if (error) {
                res.send(error);
            } else {
                //If query is sucessfull send to cliend inserted id
                res.json(results.insertId)
            }
        });
    }
}

//Delete post, gets id from body
exports.deletePost = function(req, res) {
    var id = req.body.id;
    if (!id) { //if no id is sent
        res.send("No id sent");
    } else {
        //1st select all from the table posts with that id if it does return something it means that post exists if it
        //doensn't it means that the post does not exist
        var sql = "SELECT * FROM posts WHERE post_id = " + id;
        connection.query(sql, function(error, results, fields) {
            if (error) {
                res.send(error);
            } else {
                if (!results[0]) { //Post does not exist
                    res.send("No post with given id!");
                } else {
                    //If it exists then we will delete it
                    var sql = "DELETE FROM posts WHERE post_id = " + id;
                    connection.query(sql, function(error, results, fields) {
                        if (error) {
                            res.send(error);
                        } else {
                            //Send to client the amount of affected rows
                            res.json(results.affectedRows)
                        }
                    })
                }
            }
        })
    }
}

//Update post data acording to data received from body
exports.updatePost = function(req, res) {
    var id = req.body.id;
    if (!id) {
        res.send("No id sent!");
    } else {
        var data = req.body;
        var sql = "SELECT * FROM posts WHERE post_id = " + id;
        connection.query(sql, function(error, results, fields) { //Get the post to make sure he exists
            if (error) {
                res.send(error);
            } else {
                if (!results[0]) { //Post does not exist
                    res.send("No post with given id!");
                } else { //Check data from query if matched data that we got from body
                    if ((results[0].title != data.title) && (results[0].description == data.desc)) {
                        var sql = "UPDATE posts SET title = ? WHERE post_id = " + id;
                        //Execute sql query and add change data from a row in table posts
                        connection.query(sql, [data.title], function(error, results, fields) {
                            if (error) {
                                res.send(error);
                            } else {
                                //If query is sucessfull send to client the ammount of changed rows
                                res.json(results.changedRows)
                            }
                        })
                    } else if ((results[0].description != data.desc) && (results[0].title == data.title)) {
                        var sql = "UPDATE posts SET description = ? WHERE post_id = " + id;
                        //Execute sql query and add change data from a row in table posts
                        connection.query(sql, [data.desc], function(error, results, fields) {
                            if (error) {
                                res.send(error);
                            } else {
                                //If query is sucessfull send to client the ammount of changed rows
                                res.json(results.changedRows)
                            }
                        })
                    } else if ((results[0].description != data.desc) && (results[0].title != data.title)) {
                        var sql = "UPDATE posts SET title = ?, description = ? WHERE post_id = " + id;
                        //Execute sql query and add change data from a row in table posts
                        connection.query(sql, [data.title, data.desc], function(error, results, fields) {
                            if (error) {
                                res.send(error);
                            } else {
                                //If query is sucessfull send to client the ammount of changed rows
                                res.json(results.changedRows)
                            }
                        })
                    } else {
                        //If none of the previus conditions was matched it means nothing was changed
                        res.send("Nothing was changed");
                    }
                }
            }
        })
    }
}