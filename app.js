const createError = require('http-errors')
const express = require('express')
const path = require('path')

const cookieParser = require('cookie-parser')
const logger = require('morgan')
let passport = require('passport')
let session = require('express-session')
let flash = require('express-flash')
let methodoverride = require('method-override')


if(process.env.NODE_ENV === 'development') {
  require("dotenv").config()
}

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const createGameRouter = require('./routes/createGame')
const joinRouter = require('./routes/join')
const messageRouter = require('./routes/messages')
const gameRouter = require('./routes/game')
const handRouter = require('./routes/hand')
const startRouter = require('./routes/start')

require('./auth/passport_setup')(passport)
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(flash())
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false
}))

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))
app.use('/game',express.static(path.join(__dirname, 'public')))


//init the passport library
app.use(passport.initialize())
app.use(passport.session());
app.use(methodoverride('_method'))
app.use(flash())

//routers
app.use('/', indexRouter)
app.use('/', usersRouter)
app.use('/', createGameRouter)
app.use('/', joinRouter)
app.use('/', messageRouter)
app.use('/', gameRouter)
app.use('/', handRouter)
app.use('/start', startRouter)


app.use('/users', require('./routes/users'));
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