var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParsrer = require('body-parser');
var cors = require('cors');
var passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//Components to use
app.use(cors());
app.use(express.json());
app.use(bodyParsrer.json());
app.use(cookieParser());

// Use the session middleware
app.use(session({ secret: 'keyboard cat' }));
//Passport config
app.use(passport.initialize());
app.use(passport.session());

require('./controllers/passport')(passport);

//Routes
app.use('/users', usersRouter);
app.use('/', indexRouter);

module.exports = app;