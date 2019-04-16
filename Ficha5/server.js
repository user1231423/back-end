const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

function readFile(fileName){
    var file = fs.readFileSync(fileName, 'utf-8');
    return file;
}

app.get('/', function (req, res){
    res.send('Hello World!');
});

app.get('/users', function(req,res){
    res.send(readFile('./persons.json'));
});

app.post('/user', function (req, res) {
    res.send('entrou');
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
