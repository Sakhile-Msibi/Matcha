var conn = require('../config/conn.js');
var express = require('express');
var session = require('express-session');
var bcryptjs = require('bcryptjs');
var parse = require('parse').parse;
var iplocation = require('iplocation');
var ageCalc = require('age-calculator');
var router = express.Router();
const nodemailer = require('nodemailer');
const { v1: uuidv1 } = require('uuid');
const emailToken = uuidv1();

var {AgeFromDateString, AgeFromDate} = require('age-calculator');
const loginchecker = require('./loginchecker.js');
const code = 10;

router.post('/', loginchecker.redirectDashboard, function(req, res) {
	var signin = req.body.signin;
	var name = req.body.name;
	var surname = req.body.surname;
	var email = req.body.email;
	var gender = req.body.gender;
	var city = req.body.city;
	var age = new AgeFromDateString(req.body.age).age;
	var	pswd = req.body.pswd;
	var	repswd = req.body.repswd;
	var	sexual_preference = req.body.sexual_preference;
	var regexSmall = /[a-z]/;
	var	regexCapital = /[A-Z]/;
	var	regexSC = /[a-zA-Z]/;
	var	regexAlphanumeric = /[a-zA-Z0-9]/;
	var	regexchar = /[a-zA-Z-0-9\#\$\%\^\&\*\,\.]/;
	var	regexDate = /^\d\d\d\d-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])$/;
	var emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\")){3,40}@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,6})$/i;
	var	hash = bcryptjs.hashSync(pswd, code);
	if (signin && name && surname && email && age && gender && city && pswd && repswd) {
		conn.query("SELECT * FROM user WHERE signin = ? OR email = ?", [signin, email], (err, rows, result) => {
			if (err) {
				req.session.error = 'An error has occurred';
				res.redirect('/');
			}
    		if (signin.length > 60 || email.length > 150 || surname.length > 60 || name.length > 60) {
	    		req.session.error = 'Field is too long';
		    	res.redirect('/');
    		} else if (!emailPattern.test(email)) {
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
    		} else if (pswd != repswd) {
	    		req.session.error = 'Passwords must be the same';
		    	res.redirect('/');
	    	} else if (!pswd.search(/\d/)) {
		    	req.session.error = 'The password must contain at least one number';
			    res.redirect('/');
		    } else if (pswd.search(regexSmall) == -1) {
			    req.session.error = 'The password must contain at least one small letter';
    			res.redirect('/');
	    	} else if (pswd.search(regexCapital) == -1) {
		    	req.session.error = 'The password must contain at least one capital letter';
			    res.redirect('/');
	    	} else if (pswd.search(regexchar) == -1) {
		    	req.session.error = 'The password can only have the following characters #, $, %, ^, &, *, ,, and . ';
			    res.redirect('/');
	    	} else if (pswd.length < 6) {
		    	req.session.error = 'The password must have at least 6 characters';
			    res.redirect('/');
    		} else if (req.body.age.search(regexDate)) {
	    		req.session.error = 'The date format is not valid';
		    	res.redirect('/');
    		} else if (name.length < 3 || surname.length < 3) {
	    		req.session.error = 'Name and surname must not be less than 3 characters';
		    	res.redirect('/');
    		} else if (pswd.length > 15) {
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
			conn.query('INSERT INTO popularity SET signin = ?, popular = 5', [signin], (err, rows, result) => {
				if (err) console.log(err)
				conn.query('INSERT INTO user SET signin = ?, name = ?, surname = ?, email = ?, passwd = ?, register = ?, age = ?, gender = ?, city = ?, sexual_preference = ?, hash = ?, token = ?, verified = ?', [signin, name, surname, email, hash, new Date(), age, gender, city, sexual_preference, datarand, emailToken, 0], (err, rows, result) => {
					if (err) {
						console.log(err)
						req.session.error = 'An error has occurred';
						res.redirect('/')
					} else {
						iplocation(req.ip, function(error, res) {
							if (res && res['city']) {
								conn.query('UPDATE user SET latitude = ?, longitude = ? WHERE signin = ?', res['latitude'], res['longitude'], [signin], (err) => {
									if (err) console.log(err)
								})
							} else {
								conn.query('UPDATE user SET city = "Johannesburg", latitude = 26.2041, longitude = 28.0473 WHERE signin = ?', [signin], (err) => {
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

				const transporter = nodemailer.createTransport({
					secure: true,
					service: 'gmail',
					auth: {
						user: 'thembinkosimsibi198@gmail.com',
						pass: '0786753565'
					},
					tls: {
						// do not fail on invalid certs
						rejectUnauthorized: false
					}
				});
				// var emailToken = "jhdashghohwg2gwg";
				const conUrl = `http://localhost:3000/confirmation/${emailToken}`;
				const mailOptions = {
					from: 'thembinkosimsibi198@gmail.com',
					to: req.body.email,
					subject: 'Please Verify your email',
					text: `That was easy!`,
					html: `Please click on the link bellow to confirm your email:<br>
							
					<a href="${conUrl}"><button type="button" class="btn btn-outline-secondary">Confirm</button></a>
					`
				};
					
				transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						console.log(error);
					} else {
						console.log('Email sent: ' + info.response);
					}
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
