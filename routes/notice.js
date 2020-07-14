var conn = require('../config/conn.js');
var express = require('express');
var session = require('express-session');
var router = express.Router();

router.get('/', function(req, res, next) {
	if (req.session && req.session.signin) {
		conn.query("SELECT * FROM notice WHERE signin = ? ORDER BY sendDate DESC LIMIT 25", [req.session.signin], (err, rows, result) => {
			if (err) console.log(err)
			if (rows[0] != undefined) {
				var notice = rows
				conn.query("SELECT readed FROM notice WHERE signin = ? LIMIT 1", [req.session.signin], (err1, rows1, result1) => {
					if (err1) console.log(err1)
					if (rows1[0] == undefined)
						res.render('notice', { title: 'Express', notice: notice })
					else
						res.render('notice', { title: 'Express', notice: notice })
				})
			} else {
				var notice = undefined
				res.render('notice', { notice: notice })
			}
		})
	} else {
		req.session.error = 'Please sign in';
		res.redirect('/')
	}
})

router.get('/:id', function(req, res, next) {
	if (req.session && req.session.signin) {
		if (req.params.id) {
			conn.query("SELECT MAX(id) as max FROM notice", (err, rows, result) => {
				if (req.params.id <= rows[0].max && req.params.id >= 0) {
					conn.query("UPDATE notice SET readed = 1 WHERE signin = ? AND id = ?", [req.session.signin, req.params.id], (err) => {
						if (err) console.log(err)
						res.locals.cheecked = undefined
						req.session.success = 'The notice has been read';
						res.redirect('/notice');
					});
				} else {
					req.session.error = 'bad id'
					res.redirect('/notice')
				}
			})
		} else {
			req.session.error = 'bad param'
			res.redirect('/notice')
		}
	} else {
		req.session.error = 'Please sign in';
		res.redirect('/')
	}
})

module.exports = router;
