var connection = require('../assets/db/connect');

//Request user and sends it as json to client
exports.sendUser = function (req, res, next) {
    res.json({
        user: req.user
    });
}

//Sends a simple message as json to clients
exports.sendWelcoming = function (req, res) {
    res.json({
        message: "Welcome Home after login!"
    })
}

//Requests logout and after it sends a json with variable logged set as false
exports.userlogout = function (req, res) {
    req.logOut();
    res.json({
        logged: false
    });
}

//Gets the data sent from the client side and inserts it into the database on the table posts
exports.createPost = function (req, res) {
    var data = req.body;
    console.log(data);
    if ((data.title.length == 0) || (data.desc.length == 0)) {
        res.send("Sem dados!");
    } else {
        var sql = "INSERT INTO posts SET title = ?, description = ?, date = ?, user_id = ?, likes = 0, dislikes = 0";
        var date = new Date();
        //Request current user id
        //var id = req.user.user_id;
        //Get date and time to insert on database
        var time = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
         connection.query(sql, [data.title,  , newUser.firstName], function (error, results, fields) { //Execute sql query and add data into the table users
            if (error) {
                return res.send(error);
            } else {

            }
        });
    }
}