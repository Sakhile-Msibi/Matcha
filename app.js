const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const socketIoSession = require('socket.io.session');
const serveFavicon = require('serve-favicon');
const bcryptjs = require('bcryptjs');
const morgan = require('morgan');
const conn = require('./config/database.js');
const flash = require('req-flash');
const app = express();
const server = require('http').createServer(app);

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
app.io = require('socket.io')(server);
app.use(cookieParser());
app.use(session({ secret: '123',
saveUninitialized: true,
resave: true }));
//const sess = session;
app.use(flash());

const index = require('./routes/index');
const home = require('./routes/home');
const register = require('./routes/register');
const signin = require('./routes/signin');
const signout = require('./routes/signout');
const profile = require('./routes/profile');
const profile_edit = require('./routes/profile_edit');
const user = require('./routes/user');
const search_user = require('./routes/search_user');
const block_user = require('./routes/block_user');
const unblock_user = require('./routes/unblock_user');
const catfish_account = require('./routes/catfish_account');
const password_reset = require('./routes/password_reset');
const forgot_password = require('./routes/forgot_password');
const chat = require('./routes/chat');
const message = require('./routes/message');
const notice = require('./routes/notice');
 

app.get('/', function(req, res) {
    res.send('req-flash test');
});
app.get('/test', function(req, res) {
    req.flash('successMessage', 'You are successfully using req-flash');
    //req.flash('errorMessage', 'No errors, you\'re doing fine');
 
    res.redirect('/nex');
});
 
app.get('/nex', function(req, res) {
    res.send(req.flash('successMessage'));
});

//set view file
app.set('views', path.join(__dirname, 'views'));

//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
//app.use(serveFavicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    if (req.session) {
        if (req.session.error) {
            res.locals.error = req.session.error;
            req.session.error = undefined;
        }
        if (req.session.success) {
            res.locals.success = req.session.success;
            req.session.success = undefined;
        }
        if (req.session.warning) {
            res.locals.warning = req.session.warning;
            req.session.warning = undefined;
        }
        if (req.session.info) {
            res.locals.info = req.session.info;
            req.session.info = undefined;
        }
    }
    next();
});

app.use(function(req, res, next) {
    res.io = app.io;
    res.locals.signin = req.session.signin;
    res.locals.name = req.session.name;
    res.locals.lastName = req.session.lastName;
    res.locals.age = req.session.age;
    res.locals.gender = req.session.gender;
    res.locals.main_picture = req.session.main_picture;
    res.locals.description = req.session.description;
    res.locals.interest = req.session.interest;
    res.locals.log = req.session.log;
    res.locals.ok = req.session.ok;
    // conn.query("SELECT readed FROM notice WHERE signin = ? AND readed = 0 LIMIT 1", [req.session.signin], (err, rows, results) => {
    //     if (err)
    //         console.log(err);
    //     if (rows[0] != undefined) {
    //         res.locals.looked = true;
    //     } else {
    //         res.locals.looked = undefined;
    //     }
    // });
    next();
});

app.use('/', index);
//app.use('/home', home);
// app.use('/register', register);
app.use('/signin', signin);
// app.use('/signout', signout);
// app.use('/profile', profile);
// app.use('/profile_edit', profile_edit);
// app.use('/user', user);
// app.use('/search_user', search_user);
// app.use('/block_user', block_user);
// app.use('/unblock_user', unblock_user);
// app.use('/catfish_account', catfish_account);
// app.use('/password_reset', password_reset);
// app.use('/forgot_password', forgot_password);
// app.use('/chat', chat);
// app.use('/message', message);
// app.use('/notice', notice);

const users = {};
app.io.on('connect', function(socket) {
    console.log('a user connected');
    const signin_monitor = false;
    socket.on('log', function(user) {
        conn.query('UPDATE user SET online = 1 WHERE signin = ?', [user, signin], (err) => {
            if (err)
                throw (err);
            users[user.signin] = socket.id;
        })
    });
    socket.on('parse', function(parse) {
        users[parse.signin] = socket.id;
    });
    socket.on('msg', function(message) {
        if (message == '')
            return false;
        message.user = message.accountHolder;
        date = new Date();
        message.hoursSent = date.getHours();
        message.minutesSent = date.getMinutes();
        conn.query('INSERT INTO message SET signin = ?, send_at = ?, user = ?, message = ?', [message.accountHolder, date, message.sender, message.message], (err) => {
            const msg_notice = message.sender + ' sent you a message';
            conn.query('INSERT INTO notice SET signin = ?, send_at = ?, category = ?, note = ?, readed = 0', [message.accountHolder, date, 'message', msg_notice], (err) => {
                if (err)
                    console.log(err);
                socket.send(users[message.accountHolder]).emit('notices', {
                    name: message.accountHolder,
                    message: message.message,
                    hoursSent: message.hoursSent,
                    minutesSent: message.minutesSent,
                    sender: message.sender
                });
            });
        });
        socket.on('disconnect', function() {
            console.log('disconnect');
            if(!signin_monitor) {
                return false;
            }
            conn.query('UPDATE user SET online = 0 WHERE signin = ?', [signin_monitor], (err) => {
                if (err)
                    throw (err);
            });
        });
    });
    global.users = users;
    global.io = app.io;

    //Error handling
    app.use(function(req, res, next) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
    app.use(function(err, req, res, next) {
        //Errors only shown in development
        res.locals.message = err.message;
        res.locals.err = req.app.get('env') === 'development' ? err : {};
        console.log(err);
        res.status(err.status || 500);
        res.render('error');
    })
})

app.listen(8080, () => {
    console.log('server is running at port 8080');
});

module.exports = app;