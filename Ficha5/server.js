const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

function readFile(fileName){
    var file = fs.readFileSync(fileName, 'utf-8');
    return file;
}

//Get the index of for given id's inside persons array
function getIndex(obj,id,size){
    var index;
    for (var i = 0; i <= size; i++){
        if (obj.persons[i].id == id){
            index = i;
        }
    }
    return index;
}

//Home page
app.get('/', function (req, res){
    res.send('Hello World!');
});

//See all users
app.get('/users', function(req,res){
    res.send(readFile('./persons.json'));
});

//Add new user from body data
app.post('/new', function (req, res) {
    var file = readFile('./persons.json');
    var obj = JSON.parse(file); //Json to js Object
    var size = obj.persons.length - 1; //Get the size of the object
    var newId = obj.persons[size].id + 1; //New id = last person id + 1
    var newPerson = req.body; //Request body object
    newPerson.id = newId; //Add id value to object
/*  var strNewPerson = JSON.stringify(newPerson);
    strObj.concat(strNewPerson);
    fs.appendFile('./persons.json',strNewPerson, (err) => {  
        if (err) throw err;
        console.log('The lyrics were updated!');
    }); */
    obj.persons.push(newPerson); //Push new person into persons array
    var strObj = JSON.stringify(obj); //js object to Json
    fs.writeFileSync('./persons.json',strObj); //Write json file
    res.send('New user added'); //Return message new user added
});

//Add new user
app.post('/new/simple', function (req, res) {
    var file = readFile('./persons.json');
    var obj = JSON.parse(file); //Json to js Object
    var size = obj.persons.length - 1; //Get the size of the object
    var newId = obj.persons[size].id + 1; //New id = last person id + 1
    //Create new person
    var newPerson = {
        firstName: "New",
        lastName: "user",
        gender: "M",
        age: 30,
        profession: "Unknown",
        id: newId
    }
    obj.persons.push(newPerson); //Push new person into persons array
    var strObj = JSON.stringify(obj); //js object to Json
    fs.writeFileSync('./persons.json',strObj); //Write json file
    res.send('New user added'); //Return message new user added
});

//Delete user from given id with params
app.delete('/user/:id', function (req, res) {
    var id = req.params.id;
    var file = readFile('./persons.json');
    var obj = JSON.parse(file); //Json to js Object

    var size = obj.persons.length - 1;
    var index = getIndex(obj,id,size);
    obj.persons.splice(index,1); //Apagar o index recebido acima

    var strObj = JSON.stringify(obj);
    fs.writeFileSync('./persons.json',strObj); //Write json file
    res.send('User deleted');
});

//Delete user from given id with body
app.delete('/user', function (req, res) {
    var id = req.body.id; //Get id from body
    var file = readFile('./persons.json');
    var obj = JSON.parse(file); //Json to js Object

    var size = obj.persons.length - 1;
    var index = getIndex(obj,id,size);
    obj.persons.splice(index,1); //Apagar o index recebido acima

    var strObj = JSON.stringify(obj);
    fs.writeFileSync('./persons.json',strObj); //Write json file
    res.send('User deleted');
});

//See user info from given id with params
app.get('/user/:id', function(req,res){
    var id = req.params.id; //Get id from params
    var file = readFile('./persons.json');
    var obj = JSON.parse(file);

    var size = obj.persons.length - 1;
    var index = getIndex(obj,id,size); //Get index of the given id
    res.json(obj.persons[index]); //Send json object as response
});

//See user info from given id with body
app.get('/user', function(req,res){
    var id = req.body.id; //Get id from body
    var file = readFile('./persons.json');
    var obj = JSON.parse(file);

    var size = obj.persons.length - 1;
    var index = getIndex(obj,id,size); //Get index of the given id
    res.json(obj.persons[index]); //Send json object as response
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
