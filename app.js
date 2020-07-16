var path = require('path');
var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser')
var socketIoSession = require('socket.io.session');
var favicon = require('serve-favicon');
var bcryptjs = require('bcryptjs');
var logger = require('morgan');
var conn = require('./config/conn.js');
var flash = require('req-flash');
var app = express();
var server = require('http').createServer(app);

//app.io = require('socket.io')(server)
app.io = require('socket.io')(server);
// app.use(cookieParser());
// app.use(session({ secret: '123',
// saveUninitialized: true,
// resave: true }));
// var sess = session;
// app.use(flash());

var		session = require("express-session")({
			secret: "123",
			resave: true,
			saveUninitialized: true
		});

var 	index = require('./routes/index'),
		register = require('./routes/register'),
		signin = require('./routes/signin'),
		profile = require('./routes/profile'),
		signout = require('./routes/signout'),
		home = require('./routes/home'),
		edit = require('./routes/profile_edit'),
		message = require('./routes/message'),
		chat = require('./routes/chat'),
		user = require('./routes/user'),
		block_user = require('./routes/block_user'),
		unblock_user = require('./routes/unblock_user'),
		catfish = require('./routes/catfish'),
		forgot_password = require('./routes/forgot_password'),
		password_reset = require('./routes/password_reset'),
		search_user = require('./routes/search_user'),
		notice = require('./routes/notice'),
		confirmation = require('./routes/confirmation');

const loginchecker = require('./routes/loginchecker.js');


// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(session)
//io.use(socketIOsession(session))

app.use(function (req, res, next) {
	if (req.session) {
		if (req.session.error) {
			res.locals.error = req.session.error
			req.session.error = undefined
		}
		if (req.session.success) {
			res.locals.success = req.session.success
			req.session.success = undefined
		}
		if (req.session.warning) {
			res.locals.warning = req.session.warning
			req.session.warning = undefined
		}
		if (req.session.info) {
			res.locals.info = req.session.info
			req.session.info = undefined
		}
	}
	next()
})

app.use(function(req, res, next) {
	res.io = app.io
	res.locals.signin = req.session.signin
	res.locals.gender = req.session.gender
	res.locals.surname = req.session.surname
	res.locals.name = req.session.name
	res.locals.age = req.session.age
	res.locals.ok = req.session.ok
	res.locals.interest = req.session.interest
	res.locals.descri = req.session.descri
	res.locals.profilePic = req.session.profilePic
	res.locals.log = req.session.log
	conn.query("SELECT readed FROM notice WHERE signin = ? AND readed = 0 LIMIT 1", [req.session.signin], (err, rows, result) => {
		if (err) console.log(err)
		if (rows[0] != undefined) {
			res.locals.cheecked = true
		} else {
			res.locals.cheecked = undefined
		}
	})
  next()
})

//Routes
app.use('/', index)
app.use('/register', register)
app.use('/signin', signin)
app.use('/profile', profile)
app.use('/profile_edit', edit)
app.use('/home', home)
app.use('/signout', signout)
app.use('/user', user)
app.use('/chat', chat)
app.use('/message', message)
app.use('/notice', notice)
app.use('/catfish', catfish)
app.use('/forgot_password', forgot_password)
app.use('/block_user', block_user)
app.use('/search_user', search_user)
app.use('/password_reset', password_reset)
app.use('/unblock_user', unblock_user)
app.use('/confirmation/', confirmation);


var people = {}
app.io.on('connection', function(socket){
	console.log('a user connected')
	var me = false
	socket.on('log', function(user){
		conn.query("UPDATE user SET online = 1 WHERE signin = ?", [user.signin], (err) => {
			if (err) threw (err)
			people[user.signin] = socket.id
		})
	})
	socket.on('parse', function(parse){
		people[parse.signin] = socket.id
	})

	socket.on('newmsg', function(message){
		if (message == '')
			return false
		message.user = message.moi
		date = new Date()
		message.h = date.getHours()
		message.m = date.getMinutes()
		conn.query('INSERT INTO message SET signin = ?, sendDate = ?, user = ?, message = ?', [message.moi, date, message.recup, message.message], (err) => {
			var notifmsg = message.recup + '  sent you a message';
			conn.query('INSERT INTO notice SET signin = ?, sendDate = ?, type = ?, msg = ?, readed = 0', [message.moi, date, "message", notifmsg], (err) => {
				if (err) console.log(err)
				socket.send(people[message.moi]).emit('newmsgs', {
					name: message.moi,
					message: message.message,
					h: message.h,
					m: message.m,
					recup: message.recup
				})
			})
		})
	})
	socket.on('disconnect', function () {
		console.log('disconnect')
		if (!me) {
			return false
		}
		conn.query("UPDATE user SET online = 0 WHERE signin = ?", [me], (err) => {
			if (err) threw (err)
		})
  	})
})
global.people = people
global.io = app.io

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.err = req.app.get('env') === 'development' ? err : {}

  // render the error page
	console.log(err)
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
