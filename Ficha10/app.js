// require and instantiate express
var express = require('express');
var app = express();
var uuidv1 = require('uuid/v1');
var fs = require('fs');
var multer = require('multer');
var bodyParsrer = require('body-parser');
var rimraf = require("rimraf");
var base64Img = require('base64-img');


//Multer config
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + uuidv1() + '.jpg'); //image name is always generated with given field name + random id
    }
});
var upload = multer({ storage: storage }).single('image');

// set up ejs for templating
app.set('view engine', 'ejs');

//middlewares
app.use(express.static('public'));
app.use(bodyParsrer.json());

// express server
var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port);
});

//Require socket.io
var io = require('socket.io')(server);

//Routes
app.get('/', function (req, res) {
    res.render('index.ejs');
});

//Image upload route
app.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            res.status(406).send("Error on upload!");
        } else {
            res.json({ file: req.file.filename });
        }
    })
})

//Array of connections to app
var connections = [];

//Path to file with chat history
var historyDir = './history';
var historyFile = './history/history.txt';
var imgDir = './public/images'

//Check if file and dir exists if not then we will create it
if (fs.existsSync(historyDir)) {
    if (!fs.existsSync(historyFile)) {
        fs.writeFileSync(historyFile, '');
    }
} else {
    fs.mkdirSync(historyDir);
}

//Check if image dir exists
if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir);
}

//Create write stream with append
var writeStream = fs.createWriteStream(historyFile, { 'flags': 'a' });

//Register event Connection
io.on('connection', function (socket) {
    socket.on('connected', function () {
        socket.username = "User + " + uuidv1();
        connections.push(socket.username);
        io.emit('connected', { users: connections });
        var message = "Has joined the chat!";
        io.sockets.emit('broadcast_message', { message: message, username: socket.username, importance: 2 });
        writeMessage = socket.username + " " + message + "\n";
        writeStream.write(writeMessage);
    });

    //Broadcast the new message
    socket.on('send_message', (data) => {
        if (socket.username != undefined) {
            io.sockets.emit('broadcast_message', { message: data.message, username: socket.username, importance: 3 });
            writeMessage = socket.username + ": " + data.message + "\n";
            writeStream.write(writeMessage);
        } else {
            io.emit('reload');
        }
    });

    //Handle user disconect
    socket.on('disconnect', function () {
        if (socket.username != undefined) {
            var message = "Has left the chat!";
            io.sockets.emit('broadcast_message', { message: message, username: socket.username, importance: 1 });
            connections.splice(connections.indexOf(socket.username), 1);

            //If the ammount of users on the chat is 0 we will delete all the images
            if (connections.length == 0) {
                rimraf.sync(imgDir + '/*');
            }
            io.emit('connected', { users: connections });
            writeMessage = socket.username + " " + message + "\n";
            writeStream.write(writeMessage);
        } else {
            io.emit('reload');
        }
    });

    //Handle change name
    socket.on('change_name', (data) => {
        if (socket.username != undefined) {
            var newName = data.newName;
            var splitedName = socket.username.split('+');
            if (splitedName[0] == newName) {
                var message = "This is already your name!"
                io.emit('alert', { message: message });
            } else {
                for (var i = 0; i < connections.length; i++) {
                    if (connections[i] == socket.username) {
                        var changeID = i;
                    }
                }
                splitedName[0] = newName;
                var previousName = socket.username;
                socket.username = splitedName[0].concat(' +', splitedName[1]);
                connections[changeID] = socket.username;
                var message = "Changed his username to " + socket.username;
                io.sockets.emit('broadcast_message', { message: message, username: previousName, importance: 1 });
                io.emit('connected', { users: connections, username: socket.username });
                writeMessage = previousName + " " + message + " " + socket.username + "\n";
                writeStream.write(writeMessage);
            }
        } else {
            io.emit('reload');
        }
    });

    //Broadcast image
    socket.on('image_upload', (data) => {
        if (socket.username != undefined) {
            io.emit('broadcast_image', { img: data.img, username: socket.username });
            //Image to base64 to store as string
            var img64 = base64Img.base64Sync('./public/images/' + data.img);
            writeMessage = socket.username + " sent the image: " + img64 + "\n";
            writeStream.write(writeMessage);
        } else {
            io.emit('reload');
        }
    });
});