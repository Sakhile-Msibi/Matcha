const loginreader = require('./loginchecker.js');

var express = require('express'),
	conn = require('../config/conn.js'),
	session = require('express-session'),
	bcryptjs = require('bcryptjs'),
	router = express.Router()

router.get('/',loginreader.redirectDashboard, function(req, res, next) {
	res.render('signin', { title: 'Express' })
})

router.post('/', function(req, res) {

	console.log(req.body.pswd);
	if (req.session && req.session.signin) {
		req.session.error = 'Access denied';
		res.redirect('/home')
	} else {
	var signin = req.body.signin,
		pswd = req.body.pswd
	var regexSmall = /[a-z]/,
		regexCapital = /[A-Z]/,
		regexCharacters = /[a-zA-Z-0-9\#\$\%\^\&\*\,\.]/
	if (signin && pswd) {
		conn.query("SELECT * FROM user WHERE signin = ? AND verified = 1 LIMIT 1", [signin], (err, rows, result) => {
			console.log(result.length);
			if (err) {
				req.session.error = 'The username or password is incorrect';
				res.redirect('/signin');
			} else if (!pswd.search(/\d/)) {
				req.session.error = 'The password must contain at least one number';
				res.redirect('/signin');
			} else if (pswd.search(regexSmall) == -1) {
				req.session.error = 'The password must have at least one lower case alphabet';
				res.redirect('/signin');
			} else if (pswd.search(regexCapital) == -1) {
				req.session.error = 'The password must have at least one upper case alphabet';
				res.redirect('/signin');
			} else if (pswd.search(regexCharacters) == -1) {
				req.session.error = 'The password can only have these characters #, $, %, ^, &, *, ,, and . ';
				res.redirect('/signin');
			} else if (pswd.length < 6) {
				req.session.error = 'The password must have a minimum of 6 characters';
				res.redirect('/signin');
			} else if (pswd.length > 15) {
				req.session.error = 'The password must have a maximum of 15 characters';
				res.redirect('/signin')
			} else if (rows[0]) {
				conn.query("UPDATE user SET online = 1 WHERE signin = ?", [signin], (err) => {
					if (err) console.log(err)
				})
                if (bcryptjs.compareSync(pswd, rows[0].passwd)) {
					// console.log(`This is  bcrypt ${bcryptjs.compareSync(pswd, rows[0].passwd)}`);
					req.session.signin = signin.toLowerCase()
					if (rows[0].profilePic) {
						req.session.ok = true
						req.session.orientation = rows[0].orientation
						req.session.surname = rows[0].surname
						req.session.name = rows[0].name
						req.session.gender = rows[0].gender
						req.session.profilePic = rows[0].profilePic
						req.session.age = rows[0].age
						req.session.interest = rows[0].interest
						req.session.city = rows[0].city
						req.session.log = true
						conn.query("UPDATE popularity SET popular = popular + 5 WHERE signin = ?", [signin], (err) => {
							if (err) console.log(err)
						})
						conn.query("UPDATE user SET online = 1, connect = ? WHERE signin = ?", [new Date(), signin], (err) => {
							if (err) threw (err)
						})
						req.session.success = "Welcome to Matcha";
						res.redirect('/home')
					} else {
						req.session.ok = false
						req.session.gender = rows[0].gender
						req.session.surname = rows[0].surname
						req.session.name = rows[0].name
						req.session.interest = rows[0].interest
						req.session.city = rows[0].city
						req.session.age = rows[0].age
						req.session.info = 'Please fill in your presonal information';
						conn.query("UPDATE user SET online = 1, connect = ? WHERE signin = ?", [new Date(), signin], (err) => {
							if (err) threw (err)
						})

						req.session.success = "Welcome to Matcha";
						req.session.log = true
						res.redirect('/profile')
					}
				} else {
					req.session.error = 'The username or password is incorrect ';
					res.redirect('/signin');
				}
			} else {
				req.session.error = 'Please make sure that you are a verified user and that username or password is correct';
				res.redirect('/signin');
			}
		});
	} else {
		req.session.error = 'Please fill in all the rquired details';
		res.redirect('/signin');
	}
}
});

module.exports = router;
