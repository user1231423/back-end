const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

function readFile(fileName){
    var file = fs.readFileSync(fileName, 'utf-8');
    return file;
}

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

//Add new user
app.post('/new', function (req, res) {
    var file = readFile('./persons.json');
    var obj = JSON.parse(file); //Json to js Object
    var size = Object.keys(obj).length; //Get the size of the object
    var newId = obj.persons[size].id + 1; //New id = last person id + 1
    //Create new person
    var newPerson = {
        id: newId,
        firstName: "New",
        lastName: "user",
        gender: "M",
        age: 30,
        profession: "Unknown" 
    }
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

app.delete('/user/:id', function (req, res) {
    var id = req.params.id
    var file = readFile('./persons.json');
    var obj = JSON.parse(file); //Json to js Object

    var size = obj.persons.length - 1;
    var index = getIndex(obj,id,size);
    obj.persons.splice(index,1); //Apagar o index recebido acima

    var strObj = JSON.stringify(obj);
    fs.writeFileSync('./persons.json',strObj); //Write json file
    res.send('User deleted');
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
