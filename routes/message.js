var conn = require('../config/conn.js');
var express = require('express');
var session = require('express-session');
var router = express.Router();

router.get('/', function(req, res, next) {
	if (req.session && req.session.signin) {
		conn.query("SELECT * FROM matched WHERE signin = ? LIMIT 1", [req.session.signin], (err, rows, result) => {
			if (err) console.log(err)
			if (rows[0] != undefined) {
				conn.query("SELECT m.matched, u.profilePic FROM matched m INNER JOIN user u ON m.matched = u.signin WHERE m.signin = ?", [req.session.signin], (err1, rows1, result1) => {
					if (err) console.log(err)
					var matched = rows1
 					res.render('message', { title: 'Express', matched: matched })
				})
			} else {
				req.session.error = 'You are not matched with anyone';
				res.redirect('/home');
			}
		})
	} else {
		req.session.error = 'Please sign in';
		res.redirect('/');
	}
});


router.get('/:id', function(req, res, next) {
	if (req.session && req.session.signin) {
		conn.query("SELECT * FROM matched WHERE signin = ? AND matched = ?", [req.session.signin, req.params.id], (err, rows, result) => {
			if (err) console.log(err)
			if (rows[0] != undefined) {
				req.session.success = 'Hello';
				res.redirect('/message');
			} else {
				req.session.error = 'You are not matched with anyone';
				res.redirect('/user/' + req.params.id);
			}
		})
	} else {
		req.session.error = 'Please sign in';
		res.redirect('/')
	}
})

router.get('/msg/:id', function(req, res, next) {
	if (req.session && req.session.signin) {
		if (req.params.id) {
			var talkto = req.params.id
			res.render('chat', { title: 'Express' })
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
