var createError = require('http-errors');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var toysRouter = require('./routes/toy');

var app = express();

//import mongoose library
var mongoose = require('mongoose');
//config database connection + database name
var database = "mongodb+srv://hvtraanf:0123456789@assignment.vfhclob.mongodb.net/AssignemntDb";
//connect to database
mongoose.connect(database)
  .then(() => console.log("Connect to db success"))
  .catch ((err) => console.error("Connect to db failed" + err));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/routes/toy.js', toysRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
