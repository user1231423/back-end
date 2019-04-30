const express = require('express');
const app = express();
const fs = require('fs');
const log = './log.txt';
const path = require('path');
const port = 3000;

function readFile(fileName){
    var file = fs.readFileSync(fileName, 'utf-8');
    return file;
}

function writeLog(req,res){
    var log = req.path + ", " + req.method + ", " + new Date() + "\n";
    fs.appendFile('./log.txt', log, function (err){
        if (err){
            throw err;
        }else{
            console.log('Guardado!');
        }
    })
}

app.get('/clear', function (req,res) {
    fs.writeFileSync(log,"");
    console.log("Ficheiro apagado!");
});

app.get('/download', function (req,res) {
    writeLog(req,res);
    var file = __dirname + "/log.txt";
    res.download(file);
});

app.get('/listar', function (req, res){
    writeLog(req,res);
    var file = readFile("./log.txt");
    res.writeHead(200, {
        'Content-Lenght': Buffer.byteLength(file),
        'Content-Type': 'text/plain'
    });
    res.write(file);
    res.send();
});

app.get('/user/:name', function (req,res) {
    writeLog(req,res);
    var name = req.params.name;
    var html = readFile("./hello.html");
    res.writeHead(200, {
        'Content-Lenght': Buffer.byteLength(html),
        'Content-Type': 'text/html'
    });
    var response = html.replace("{name}",name);
    res.write(response);
    res.end();
});

app.get('/root', function(req,res){
    writeLog(req,res);
    var html = readFile("./index.html")
    var date = new Date();
    res.writeHead(200, {
        'Content-Lenght': Buffer.byteLength(html),
        'Content-Type': 'text/html'
    });
    var response = html.replace("{date}", date);
    res.write(response);
    res.end();
});

app.listen(port, function(){
    if (fs.existsSync(log)){
        console.log("Ficheiro já existe!");
    }else{
        fs.writeFileSync(log,"");
        console.log("Novo ficheiro criado!");
    }
    console.log(`Example app listening on port ${port}!`);
});