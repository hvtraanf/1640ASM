var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bcrypt = require('bcrypt');
var session = require('express-session');
var flash = require('connect-flash');

var indexRouter = require('./routes/index');

var toysRouter = require('./routes/toy');
var userRouter = require('./routes/user');
var cartRouter = require('./routes/cart');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

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

//Configure Flash
app.use(flash());

//Configure Session
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Note: `secure: true` requires an HTTPS connection
}));

//Configure Routers
app.use('/', indexRouter);
app.use('/toy', toysRouter);
app.use('/', userRouter);
app.use('/', cartRouter);

app.get('*', (req, res, next) => {
  res.locals.cartRouter = req.session.cartRouter;
})

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

var port = 3001; //Render Port
app.listen(port);

module.exports = app;
