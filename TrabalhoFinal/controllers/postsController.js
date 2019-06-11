var connection = require('../assets/db/connect');

//Gets the data sent from the client side and inserts it into the database on the table posts
exports.createPost = function (req, res) {
    var data = req.body;
    if ((Object.keys(data).length == 0) || (!data)) {
        res.send("No data sent!");
    } else {
        //Request current user id
        var id = req.user.user_id;
        if ((!data.title) || (!data.desc) || (data.title.length == 0) || (data.desc.length == 0) || (!id)) {
            res.send("Need more data!");
        } else {
            var date = new Date();
            //Get date and time to insert on database
            var time = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            var sql = "INSERT INTO posts SET title = ?, description = ?, date = ?, user_id = ?, likes = 0, dislikes = 0";
            connection.query(sql, [data.title, data.desc, time, id], function (error, results, fields) { //Execute sql query and add data into the table posts
                if (error) {
                    res.send(error);
                } else {
                    //If query is sucessfull send to cliend inserted id
                    res.json(results.insertId)
                }
            });
        }
    }
}

//Delete post, gets id from body
exports.deletePost = function (req, res) {
    var id = req.params.id;
    if (!id) { //if no id is sent
        res.send("No id sent");
    } else {
        //1st select all from the table posts with that id if it does return something it means that post exists if it
        //doensn't it means that the post does not exist
        var sql = "SELECT * FROM posts WHERE post_id = " + id;
        connection.query(sql, function (error, results, fields) {
            if (error) {
                res.send(error);
            } else {
                if (!results[0]) { //Post does not exist
                    res.send("No post with given id!");
                } else {
                    if (results[0].user_id == req.user.user_id) {
                        //If it exists then we will delete it
                        var sql = "DELETE FROM posts WHERE post_id = " + id;
                        connection.query(sql, function (error, results, fields) {
                            if (error) {
                                res.send(error);
                            } else {
                                //Send to client the amount of affected rows
                                res.json(results.affectedRows)
                            }
                        });
                    } else {
                        res.send("Can't delete post it's not yours!");
                    }
                }
            }
        })
    }
}

//Update post data acording to data received from body
exports.updatePost = function (req, res) {
    var id = req.params.id;
    if (!id) {
        res.send("No id sent!");
    } else {
        var data = req.body;
        if ((Object.keys(data).length == 0) || (!data)) {
            res.send("No data sent!");
        } else {
            var sql = "SELECT * FROM posts WHERE post_id = " + id;
            connection.query(sql, function (error, results, fields) { //Get the post to make sure he exists
                if (error) {
                    res.send(error);
                } else {
                    if (!results[0]) { //Post does not exist
                        res.send("No post with given id!");
                    } else {
                        if (results[0].user_id == req.user.user_id) {
                            //Check data from query if matched data that we got from body
                            if ((results[0].title != data.title) && (results[0].description == data.desc)) {
                                var sql = "UPDATE posts SET title = ? WHERE post_id = " + id;
                                //Execute sql query and add change data from a row in table posts
                                connection.query(sql, [data.title], function (error, results, fields) {
                                    if (error) {
                                        res.send(error);
                                    } else {
                                        //If query is sucessfull send to client the ammount of changed rows
                                        res.json(results.changedRows)
                                    }
                                });
                            } else if ((results[0].description != data.desc) && (results[0].title == data.title)) {
                                var sql = "UPDATE posts SET description = ? WHERE post_id = " + id;
                                //Execute sql query and add change data from a row in table posts
                                connection.query(sql, [data.desc], function (error, results, fields) {
                                    if (error) {
                                        res.send(error);
                                    } else {
                                        //If query is sucessfull send to client the ammount of changed rows
                                        res.json(results.changedRows)
                                    }
                                });
                            } else if ((results[0].description != data.desc) && (results[0].title != data.title)) {
                                var sql = "UPDATE posts SET title = ?, description = ? WHERE post_id = " + id;
                                //Execute sql query and add change data from a row in table posts
                                connection.query(sql, [data.title, data.desc], function (error, results, fields) {
                                    if (error) {
                                        res.send(error);
                                    } else {
                                        //If query is sucessfull send to client the ammount of changed rows
                                        res.json(results.changedRows)
                                    }
                                });
                            } else {
                                //If none of the previus conditions was matched it means nothing was changed
                                res.send("Nothing was changed");
                            }
                        } else {
                            res.send("Can't edit post if it's not yours!");
                        }
                    }
                }
            })
        }
    }
}

//Gets the data sent from the client side and inserts it into the database on the table posts
exports.userPosts = function (req, res) {
    //Request current user id
    var id = req.user.user_id;
    var sql = "SELECT users.user_id, users.nome, users.contacto, users.data_nasc, imagem_user.caminho AS img_user,posts.post_id, posts.title, posts.description, posts.date, posts.likes, posts.dislikes, imagem_posts.caminho AS img_post FROM posts LEFT JOIN imagem_posts ON imagem_posts.post_id = posts.post_id INNER JOIN users ON posts.user_id = users.user_id LEFT JOIN imagem_user on imagem_user.user_id = users.user_id WHERE users.user_id = " + id;
    connection.query(sql, function (error, results, fields) {
        if (error) {
            res.send(error);
        } else {
            if (results.length == 0) {
                res.send("This user has no posts!");
            } else {
                res.json(results);
            }
        }
    });
}

//Get a list of all posts from the session users friends
exports.friendsPosts = function (req, res) {
    var id = req.user.user_id;
    //Select all posts from the current user friends ordered by date from the most recent to the oldest
    var sql = "SELECT users.user_id, users.nome, users.contacto, users.data_nasc, imagem_user.caminho AS img_user,posts.post_id, posts.title, posts.description, posts.date, posts.likes, posts.dislikes, imagem_posts.caminho AS img_post FROM posts LEFT JOIN imagem_posts ON imagem_posts.post_id = posts.post_id INNER JOIN users ON posts.user_id = users.user_id LEFT JOIN imagem_user on imagem_user.user_id = users.user_id INNER JOIN relations ON users.user_id = relations.user_2 AND relations.status = 2 AND relations.user_1 = ? ORDER BY posts.date DESC";
    connection.query(sql, [id], function (error, results, fields) {
        if (error) {
            res.send(error);
        } else {
            if (results.length == 0) {
                res.send("No posts to show!")
            } else {
                res.json(results);
            }
        }
    });
}

//Increment likes to the post
exports.postsLikes = function (req, res) {
    var postID = req.params.id;
    var sql = "SELECT * FROM posts WHERE post_id = " + postID;
    connection.query(sql, function (error, results, fields) {
        if (error) {
            res.send(error);
        } else {
            if (results.length == 0) {
                res.send("No post with given id!");
            } else {
                var likes = results[0].likes;
                likes += 1;
                sql = "UPDATE posts SET likes = ? WHERE post_id = " + postID;
                connection.query(sql, [likes], function (error, results, fields) {
                    if (error) {
                        res.send(error);
                    } else {
                        res.json(results.changedRows);
                    }
                });
            }
        }
    });
}

//Increment dislikes to the post
exports.postsDislikes = function (req, res) {
    var postID = req.params.id;
    var sql = "SELECT * FROM posts WHERE post_id = " + postID;
    connection.query(sql, function (error, results, fields) {
        if (error) {
            res.send(error);
        } else {
            if (results.length == 0) {
                res.send("No post with given id!");
            } else {
                var dislikes = results[0].dislikes;
                dislikes += 1;
                sql = "UPDATE posts SET dislikes = ? WHERE post_id = " + postID;
                connection.query(sql, [dislikes], function (error, results, fields) {
                    if (error) {
                        res.send(error);
                    } else {
                        res.json(results.changedRows);
                    }
                });
            }
        }
    });
}