var conn = require('../config/conn.js');
var express = require('express');
var session = require('express-session');
var router = express.Router();

router.get('/:id', function(req, res, next) {
	if (req.session && req.session.signin) {
		if (req.params.id) {
			conn.query("SELECT * from matched WHERE signin = ? AND matched = ?", [req.session.signin, req.params.id], (err, rows, result) => {
				if (err) console.log(err)
				if (rows[0] != undefined) {
					var talkto = req.params.id
					conn.query("SELECT * FROM message WHERE (signin = ? AND user = ?) OR (signin = ? AND user = ?) ORDER BY sendDate ASC", [talkto, req.session.signin, req.session.signin, talkto], (err, rows, result) => {
						if (err) console.log(err)
						var message = rows
						res.render('chat', { title: 'Express', me: req.session.signin, talkto: talkto, message: message })
					})
				} else {
					req.session.error = 'You did not match with ' + req.params.id
					res.redirect('/user/'+ req.params.id)
				}
			})
		} else {
			req.session.error = 'Please select a user';
			res.redirect('/message');
		}
	} else {
		req.session.error = 'Please sign in';
		res.redirect('/');
	}
});

module.exports = router;
