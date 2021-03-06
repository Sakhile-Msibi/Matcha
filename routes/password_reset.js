var conn = require('../config/conn.js');
var express = require('express');
var session = require('express-session');
var nodeMail = require('node-mailer');
var bcryptjs = require('bcryptjs');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.redirect('/')
})

router.get('/:hash', function(req, res, next) {
	if (req.params.hash) {
		conn.query("SELECT id FROM user WHERE hash = ?", [req.params.hash], (err, rows, result) => {
			if (err) console.log(err)
			if (rows[0] != undefined) {
				var id = rows[0].id
				res.render('password_reset', { id: id })
			} else {
				req.session.error = "There is a problem";
			 	res.redirect('/');
			}
		})
	} else {
		res.redirect('/')
	}
})

const	code = 10

router.post('/', function(req, res, next) {
	var pswd = req.body.pswd,
		repswd = req.body.repswd,
		usr = req.body.usr
	if (pswd && req) {
		if (usr) {
			var	hash = bcryptjs.hashSync(req.body.pswd, code)
			conn.query("UPDATE user SET passwd = ? WHERE id = ?", [hash, usr], (err) => {
				if (err) console.log(err)
				req.session.success = "Password changed";
				res.redirect('/signin')
			})
		} else {
			req.session.error= "An error has occurrred";
			res.redirect('/')
		}
	} else {
		req.session.error= "An error has occurrred";
		res.redirect('/');
	}
})

module.exports = router;
