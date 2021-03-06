var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParsrer = require('body-parser');
var cors = require('cors');
var passport = require('passport');

//Requires routes
var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var usersRouter = require('./routes/users');
var friendsRouter = require('./routes/friends');
var postsRouter = require('./routes/posts');
var messageRouter = require('./routes/messages');

var app = express();
//Components to use
app.use(cors({ credentials: true, origin: 'http://localhost:8080' })); //USE THIS OR NO COOKIS WILL BE ALLOWED BY CORS
app.use(express.json());
app.use(bodyParsrer.json());
app.use(cookieParser());

// Use the session middleware
app.use(session({ secret: 'keyboard cat' }));
//Passport config
app.use(passport.initialize());
app.use(passport.session());

require('./controllers/passport')(passport);

//Routes controllers
app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/users', usersRouter);
app.use('/friends', friendsRouter);
app.use('/posts', postsRouter);
app.use('/message', messageRouter);

module.exports = app;