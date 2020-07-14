var conn = require('../config/conn.js');
var express = require('express');
var session = require('express-session');
var nodeMail = require('node-mailer');
var regexMail = require('regex-email');
var router = express.Router();


router.get('/', function(req, res, next) {
	res.render('forgot_password')
})	

router.post('/', function(req, res, next) {
	var mail = req.body.email
	if (!regexMail.test(mail)) {
		req.session.error = 'Invalid email';
		res.redirect('/')
	} else {
		conn.query('SELECT hash, signin FROM user WHERE email = ?', [mail], (err, rows, result) => {
			if (err) console.log(err)
			if (rows[0] != undefined) {
				var hash = rows[0].hash
				var signin = rows[0].signin
					var smtpTransport = nodeMail.createTransport({
						service: 'Gmail',
						auth: {
							user: 'thembinkosimsibi198@gmail.com',
							pass: '0786753565'
						}
					})
					var mailOptions = {
						to: mail,
						from: 'thembinkosimsibi198@gmail.com',
						subject: 'Matcha Password Reset',
						text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
						'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
						'http://localhost:8080' + '/password_reset/' + hash + '\n\n' +
						'If you did not request this, please ignore this email and your password will remain unchanged.\n'
					}
					smtpTransport.sendMail(mailOptions, function(err) {
						if (err) console.log(err)
						else {
							req.session.success = "An email has been sent to you";
							res.redirect('/home');
						}
					})
			} else {
				req.session.error = 'This email does not exist in our system';
				res.redirect('/forgot_password');
			}
		});
	}
});

module.exports = router;
