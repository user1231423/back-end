var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'backend'
});

exports.author_detail = function (req, res, next) {
    userId = req.params.id;
    var sql = "SELECT * FROM persons WHERE Id = ?";
    connection.query(sql, [userId], function (error, results, fields) {
        if (error) {
            throw error
        } if (Object.keys(results).length == 0) {
            res.send("Utilizador não existe");
        } else {
            res.json(results);
        }
    })
};

exports.get_allPersons = function (req, res, next) {
    connection.query('SELECT * FROM persons', function (error, results, fields) {
        if (error) {
            throw error
        } else {
            res.json(results);
        }
    })
};

exports.create_person = function (req, res, next) {
    var dataFromBody = req.body;
    var sql = "INSERT INTO persons SET ?";
    connection.query(sql, [dataFromBody], function (error, results, fields) {
        if (error) {
            throw error
        } else {
            res.json(results.insertId);
        }
    })
};

exports.delete_person = function (req, res, next) {
    userId = req.params.id;
    var sql = "DELETE FROM persons WHERE Id = ?";
    connection.query(sql, [userId], function (error, results, fields) {
        if (error) {
            throw error
        } else if (results.affectedRows == 0) {
            res.send("Utilizador não existe!");
        } else {
            res.json(results.affectedRows);
        }
    })
};

exports.get_person_by_age_profession = function (req, res, next) {
    userAge = req.params.age;
    userProfession = req.params.profession;
    var sql = "SELECT * FROM persons WHERE  Age = ? AND Profession = ?";
    connection.query(sql, [userAge, userProfession], function (error, results, fields) {
        if (error) {
            throw error
        } else if (Object.keys(results).length == 0) {
            res.send("Utilizador não existe");
        } else {
            res.json(results);
        }
    })
};
