var connection = require('../assets/db/connect');
// =======================How the table relations works ===================================================================
// the filed status of the table means:
// 1- Friend request sent
// 2- They are fiends
// 3- Blocked
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
            res.json(results);
        }
    });
}