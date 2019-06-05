var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var bodyParsrer = require('body-parser');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//Components to use

//Allow cors to get all origins and methods or else you are never allowed to make POST, PUT, DELETE requests only GET
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(bodyParsrer.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 } })); // Use the session middleware

//Routes
app.use('/', indexRouter);
app.use('/users', cors(), usersRouter);

module.exports = app;