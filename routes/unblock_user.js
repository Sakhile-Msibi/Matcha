var conn = require('../config/conn.js');
var express = require('express');
var session = require('express-session');
var router = express.Router();


router.get('/:id', function(req, res, next) {
	if (req.session && req.session.signin) {
		if (req.params.id) {
			if (req.session.signin != req.params.id) {
				conn.query("DELETE FROM blocked WHERE user = ? AND signin = ?", [req.params.id, req.session.signin], (err) => {
					if (err) console.log(err)
					req.session.success = req.params.id + " is no longer blocked by you";
					res.redirect('/home');
				})
			} else {
				req.session.error = 'An error has occured';
				res.redirect('/home')
			}
		} else {
			req.session.error = 'An error has occurred';
			res.redirect('/home')
		}
	} else {
		req.session.error = 'Please sign in';
		res.redirect('/')
	}
})

module.exports = router
