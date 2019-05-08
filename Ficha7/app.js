const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'backend'
});

app.get('/person', function(req,res){
    connection.query('SELECT * FROM persons', function (error, results, fields) {
        if (error) {
            throw error
        }else{
            res.json(results);
        }
    });       
});

app.post('/person', function(req,res){
    var dataFromBody = req.body;
    var sql = "INSERT INTO persons SET ?";
    connection.query(sql,[dataFromBody],function (error, results, fields) {
        if (error) {
            throw error
        }else{
            res.json(results.insertId);
        }
    });       
});

app.delete('/person/:id', function(req,res){
    userId = req.params.id;
    var sql = "DELETE FROM persons WHERE Id = ?";
     connection.query(sql,[userId],function (error, results, fields) {
        if (error) {
            throw error
        }else if(results.affectedRows == 0){
            res.send("Utilizador não existe!");
        }else{
            res.json(results.affectedRows);
        }
    });
});

app.get('/person/:id', function(req,res){
    userId = req.params.id;
    var sql = "SELECT * FROM persons WHERE Id = ?";
     connection.query(sql,[userId],function (error, results, fields) {
        if (error) {
            throw error
        }if (Object.keys(results).length == 0){
            res.send("Utilizador não existe");
        }else{
            res.json(results);
        }
    });
});

app.get('/person/:age/:profession', function(req,res){
    userAge = req.params.age;
    userProfession = req.params.profession;
    var sql = "SELECT * FROM persons WHERE  Age = ? AND Profession = ?";
     connection.query(sql, [userAge, userProfession], function (error, results, fields) {
        if (error) {
            throw error
        }else if (Object.keys(results).length == 0){
            res.send("Utilizador não existe");
        }else{
            res.json(results);
        }
    });
});

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});