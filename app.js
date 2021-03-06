var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var fileUpload = require('express-fileupload');
//Routes of app
var index = require('./routes/index');
var login = require('./routes/login');
var votar = require('./routes/votar');
var about = require('./routes/about');
var admin = require('./routes/admin');
//Apis de MongoDB
var monk = require('monk');
var mongo = require('mongodb');
var db = monk("localhost:27017/medalla");
if(!db){
  console.log('no connection to Mongo db');
}
db.then(() => {
  console.log('Connected correctly to server');
});
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(fileUpload());

app.use(session({
  secret:'my secret',
  cookie:{}
}));
app.use(function(req,res,next){
    req.db = db;
    next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);//es pot canviar per enviar a una altre pagina
app.use('/login', login);
app.use('/votar', votar);
app.use('/about',about);
app.use('/admin',admin);

//MAke our db accessible to
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
