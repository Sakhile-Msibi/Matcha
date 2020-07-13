var 	express = require('express'),
		connect = require('../config/conn.js'),
		session = require('express-session'),
		regex = require('regex-email'),
		bcrypt = require('bcryptjs'),
		iplocation = require('iplocation'),
		ageCalculator = require('age-calculator'),
		parse = require('parse').parse,
		router = express.Router()

var {AgeFromDateString, AgeFromDate} = require('age-calculator')
const	salt = 10

router.post('/', function(req, res) {
	var	signin = req.body.signin,
		name = req.body.name,
		surname = req.body.surname,
		email = req.body.email,
		gender = req.body.gender,
		city = req.body.city,
		age = new AgeFromDateString(req.body.age).age
		pswd = req.body.pswd,
		repswd = req.body.repswd,
		interest = req.body.interest
	var regexSmall = /[a-z]/,
		regexCapital = /[A-Z]/,
		regexSC = /[a-zA-Z]/,
		regexAlphanumeric = /[a-zA-Z0-9]/,
		regexchar = /[a-zA-Z-0-9\#\$\%\^\&\*\,\.]/,
		regexDate = /^\d\d\d\d-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])$/
	var	hash = bcrypt.hashSync(pswd, salt)
	if (signin && name && surname && email && age && gender && city && pswd && repswd) {
		connect.query("SELECT * FROM user WHERE signin = ? OR email = ?", [signin, email], (err, rows, result) => {
			if (err) {
				req.session.error = 'An error has occurred';
				res.redirect('/');
			}
    		if (signin.length > 60 || email.length > 150 || surname.length > 60 || name.length > 60) {
	    		req.session.error = 'Field is too long';
		    	res.redirect('/');
    		} else if (!regex.test(email)) {
	    		req.session.error = 'Invalid email!';
		    	res.redirect('/');
    		} else if (signin.search(regexAlphanumeric)) {
	    		req.session.error = 'This field must only contain alphabets and numbers';
		    	res.redirect('/');
	    	} else if (name.search(regexSC) || surname.search(regexSC)) {
		    	req.session.error = 'The field must only contain alphabets';
			    res.redirect('/');
    		} else if (city.search(regexSC)) {
	    		req.session.error = 'This field must only contain alphabets';
		    	res.redirect('/');
    		} else if (password != repeatPassword) {
	    		req.session.error = 'Passwords must be the same';
		    	res.redirect('/');
	    	} else if (!password.search(/\d/)) {
		    	req.session.error = 'The password must contain at least one number';
			    res.redirect('/');
		    } else if (password.search(regexSmall) == -1) {
			    req.session.error = 'The password must contain at least one small letter';
    			res.redirect('/');
	    	} else if (password.search(regexCapital) == -1) {
		    	req.session.error = 'The password must contain at least one capital letter';
			    res.redirect('/');
	    	} else if (password.search(regexchar) == -1) {
		    	req.session.error = 'The password can only have the following characters #, $, %, ^, &, *, ,, and . ';
			    res.redirect('/');
	    	} else if (password.length < 6) {
		    	req.session.error = 'The password must have at least 6 characters';
			    res.redirect('/');
    		} else if (req.body.age.search(regexDate)) {
	    		req.session.error = 'The date format is not valid';
		    	res.redirect('/');
    		} else if (name.length < 3 || surname.length < 3) {
	    		req.session.error = 'Name and surname must not be less than 3 characters';
		    	res.redirect('/');
    		} else if (password.length > 15) {
	    		req.session.error = 'The password must have less than 15 characters';
		    	res.redirect('/');
    		} else if (rows[0] && rows[0]['email']) {
	    		req.session.error = 'The email is already in use';
		    	res.redirect('/');
    		} else if (rows[0] && rows[0]['signin']) {
	    		req.session.error = "The username is already in use";
		    	res.redirect('/');
    		} else if (age < 18) {
	    		req.session.error = "You are too young";
		    	res.redirect('/');
    		} else {
			var datarand = "t" + Math.random(555, 9560)
			connect.query('INSERT INTO popularity SET signin = ?, popular = 5', [signin], (err, rows, result) => {
				if (err) console.log(err)
				connect.query('INSERT INTO user SET signin = ?, name = ?, surname = ?, email = ?, passwd = ?, register = ?, age = ?, gender = ?, city = ?, interest = ?, hash = ?', [signin, name, surname, email, hash, new Date(), age, gender, city, interest, datarand], (err, rows, result) => {
					if (err) {
						console.log(err)
						req.session.error = 'An error has occurred';
						res.redirect('/')
					} else {
						iplocation(req.ip, function(error, res) {
							if (res && res['city']) {
								connect.query('UPDATE user SET latitude = ?, longitude = ? WHERE signin = ?', res['latitude'], res['longitude'], [signin], (err) => {
									if (err) console.log(err)
								})
							} else {
								connect.query('UPDATE user SET city = "Paris", latitude = 48.8965, longitude = 2.3182 WHERE signin = ?', [signin], (err) => {
									if (err) console.log(err)
								})
							}
						})
					}
					var s = 'Thank you, Welcome to Matcha ';
					s += signin
					req.session.success = s
					res.redirect('/signin')
				});
			});
		}
		});
	} else {
		req.session.error = 'Please complete all fields.';
		res.redirect('/');
	}
});

module.exports = router;
