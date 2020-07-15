<<<<<<< HEAD
var		express = require('express'),
 		path = require('path'),
		favicon = require('serve-favicon'),
		app = express(),
 		logger = require('morgan'),
		connect = require('./config/database.js')
		cookieParser = require('cookie-parser'),
	 	bodyParser = require('body-parser'),
    	session = require('express-session'),
		server = require('http').createServer(app),
		bcrypt = require('bcryptjs'),
		socketIOSession = require("socket.io.session")

app.io = require('socket.io')(server)

var		session = require("express-session")({
			secret: "i901884384jdowkkd",
			resave: true,
			saveUninitialized: true
		})

var 	index = require('./routes/index'),
		register = require('./routes/register'),
		login = require('./routes/login'),
		profil = require('./routes/profil'),
		logout = require('./routes/logout'),
		home = require('./routes/home'),
		edit = require('./routes/user_edit'),
		message = require('./routes/message'),
		chat = require('./routes/chat'),
		user = require('./routes/user'),
		block = require('./routes/block'),
		unblock = require('./routes/unblock'),
		fake = require('./routes/fake'),
		forgot = require('./routes/forgot'),
		reset = require('./routes/reset'),
		search = require('./routes/search'),
		notif = require('./routes/notif')
=======
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
		notice = require('./routes/notice')
>>>>>>> 24fde18b2ec5a30375acf21a9993b93d4bb66971

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
<<<<<<< HEAD
	res.locals.login = req.session.login
	res.locals.sexe = req.session.sexe
	res.locals.lastname = req.session.lastname
=======
	res.locals.signin = req.session.signin
	res.locals.gender = req.session.gender
	res.locals.surname = req.session.surname
>>>>>>> 24fde18b2ec5a30375acf21a9993b93d4bb66971
	res.locals.name = req.session.name
	res.locals.age = req.session.age
	res.locals.ok = req.session.ok
	res.locals.interest = req.session.interest
	res.locals.descri = req.session.descri
<<<<<<< HEAD
	res.locals.mainpic = req.session.mainpic
	res.locals.log = req.session.log
	connect.query("SELECT readed FROM notif WHERE login = ? AND readed = 0 LIMIT 1", [req.session.login], (err, rows, result) => {
=======
	res.locals.profilePic = req.session.profilePic
	res.locals.log = req.session.log
	conn.query("SELECT readed FROM notice WHERE signin = ? AND readed = 0 LIMIT 1", [req.session.signin], (err, rows, result) => {
>>>>>>> 24fde18b2ec5a30375acf21a9993b93d4bb66971
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
<<<<<<< HEAD
app.use('/login', login)
app.use('/profil', profil)
app.use('/user_edit', edit)
app.use('/home', home)
app.use('/logout', logout)
app.use('/user', user)
app.use('/chat', chat)
app.use('/message', message)
app.use('/notif', notif)
app.use('/fake', fake)
app.use('/forgot', forgot)
app.use('/block', block)
app.use('/search', search)
app.use('/reset', reset)
app.use('/unblock', unblock)
=======
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
>>>>>>> 24fde18b2ec5a30375acf21a9993b93d4bb66971

var people = {}
app.io.on('connection', function(socket){
	console.log('a user connected')
	var me = false
	socket.on('log', function(user){
<<<<<<< HEAD
		connect.query("UPDATE user SET online = 1 WHERE login = ?", [user.login], (err) => {
			if (err) threw (err)
			people[user.login] = socket.id
		})
	})
	socket.on('parse', function(parse){
		people[parse.login] = socket.id
=======
		conn.query("UPDATE user SET online = 1 WHERE signin = ?", [user.signin], (err) => {
			if (err) threw (err)
			people[user.signin] = socket.id
		})
	})
	socket.on('parse', function(parse){
		people[parse.signin] = socket.id
>>>>>>> 24fde18b2ec5a30375acf21a9993b93d4bb66971
	})

	socket.on('newmsg', function(message){
		if (message == '')
			return false
		message.user = message.moi
		date = new Date()
		message.h = date.getHours()
		message.m = date.getMinutes()
<<<<<<< HEAD
		connect.query('INSERT INTO message SET login = ?, sendat = ?, user = ?, message = ?', [message.moi, date, message.recup, message.message], (err) => {
			var notifmsg = message.recup + ' Vous a envoye un message'
			connect.query('INSERT INTO notif SET login = ?, sendat = ?, type = ?, msg = ?, readed = 0', [message.moi, date, "message", notifmsg], (err) => {
=======
		conn.query('INSERT INTO message SET signin = ?, sendDate = ?, user = ?, message = ?', [message.moi, date, message.recup, message.message], (err) => {
			var notifmsg = message.recup + '  sent you a message';
			conn.query('INSERT INTO notice SET signin = ?, sendDate = ?, type = ?, msg = ?, readed = 0', [message.moi, date, "message", notifmsg], (err) => {
>>>>>>> 24fde18b2ec5a30375acf21a9993b93d4bb66971
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
<<<<<<< HEAD
		connect.query("UPDATE user SET online = 0 WHERE login = ?", [me], (err) => {
=======
		conn.query("UPDATE user SET online = 0 WHERE signin = ?", [me], (err) => {
>>>>>>> 24fde18b2ec5a30375acf21a9993b93d4bb66971
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
