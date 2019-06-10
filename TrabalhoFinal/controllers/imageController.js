var connection = require('../assets/db/connect');
const fs = require('fs')
const uuidv1 = require('uuid/v1');
var multer = require('multer');
//Set multer to diskStorage
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + uuidv1() + '.jpg'); //image name is always generated with given field name + random id
    }
});
//multer will always upload a single image to default server image storage folder
var upload = multer({ storage: storage }).single('image');

//Upload image to folder and location to table imagem_posts
exports.uploadPostImg = function (req, res) {
    var postID = req.params.id;
    if (!postID) {
        res.send("Post does not exist!");
    } else {
        upload(req, res, function (error, result) {
            if (error) {
                res.send(error);
            } else {
                if (!req.file) {
                    res.send("No file given!");
                } else {
                    var sql = "SELECT * FROM imagem_posts WHERE post_id = " + postID;
                    connection.query(sql, function (error, results, fields) {
                        if (error) {
                            res.send(error);
                        } else {
                            if (results.length != 0) {
                                res.send("Post already has image");
                            } else {
                                var filePath = req.file.path;
                                var sql = "INSERT INTO imagem_posts SET caminho = ?, post_id = ?";
                                connection.query(sql, [filePath, postID], function (error, results, fields) {
                                    if (error) {
                                        res.send(error);
                                    } else {
                                        res.json(results.insertId);
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    }
}

//Upload image to folder and location to table imagem_user
exports.uploadUserImg = function (req, res) {
    var userID = req.params.id;
    if (!userID) {
        res.send("Post does not exist!");
    } else {
        upload(req, res, function (error, result) {
            if (error) {
                res.send(error);
            } else {
                if (!req.file) {
                    res.send("No file given!");
                } else {
                    var sql = "SELECT * FROM imagem_user WHERE user_id = " + userID;
                    connection.query(sql, function (error, results, fields) {
                        if (error) {
                            res.send(error);
                        } else {
                            if (results.length != 0) {
                                res.send("User already has image!");
                            } else {
                                var filePath = req.file.path;
                                var sql = "INSERT INTO imagem_user SET caminho = ?, user_id = ?";
                                connection.query(sql, [filePath, userID], function (error, results, fields) {
                                    if (error) {
                                        res.send(error);
                                    } else {
                                        res.json(results.insertId);
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    }
}

//Deletes the current session user image
exports.deleteUserImg = function (req, res) {
    var userID = req.user.user_id;
    //Check if user has image
    var sql = "SELECT * FROM imagem_user WHERE user_id = " + userID;
    connection.query(sql, function (error, results, fields) {
        if (error) {
            res.send(error);
        } else {
            if (results.length == 0) {
                res.send("User has no image!");
            } else {
                var imgPath = results[0].caminho;
                var sql = "DELETE FROM imagem_user WHERE user_id = " + userID;
                connection.query(sql, function (error, results, fields) {
                    if (error) {
                        res.send(error);
                    } else {
                        //Also deletes image from server
                        fs.unlinkSync('./' + imgPath, function (error) {
                            if (error) {
                                res.send(error);
                            }
                        });
                        res.json(results.affectedRows);
                    }
                })
            }
        }
    })
}

//Delete post image
exports.deletePostImg = function (req, res) {
    var postID = req.params.id;
    //Check if post has image
    var sql = "SELECT * FROM imagem_posts WHERE post_id = " + postID;
    connection.query(sql, function (error, results, fields) {
        if (error) {
            res.send(error);
        } else {
            if (results.length == 0) {
                res.send("Post has no image!");
            } else {
                var imgPath = results[0].caminho;
                var sql = "DELETE FROM imagem_posts WHERE post_id = " + postID;
                connection.query(sql, function (error, results, fields) {
                    if (error) {
                        res.send(error);
                    } else {
                        //Also deletes image from server
                        fs.unlinkSync('./' + imgPath, function (error) {
                            if (error) {
                                res.send(error);
                            }
                        });
                        res.json(results.affectedRows);
                    }
                })
            }
        }
    })
}