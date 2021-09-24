var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var cors = require('cors');

var signupRouter = require('./routes/signup');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var registerRouter = require('./routes/register');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: process.env.DG_SESSION_SECRET
}));

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.json({'error': 'Access denied. Please create an account (if you haven\'t already) and log in.'});
  }
}

app.options('/api/signup', cors());
app.use('/api/signup', cors(), signupRouter);

app.options('/api/login', cors());
app.use('/api/login', cors(), loginRouter);

app.options('/api/logout', cors());
app.use('/api/logout', cors(), logoutRouter);

app.use('/api/register', restrict, registerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({'error': err});
});

module.exports = app;
