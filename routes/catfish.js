var conn = require('../config/conn.js');
var express = require('express');
var session = require('express-session');
var router = express.Router();

router.get('/:id', function(req, res, next) {
	if (req.session && req.session.signin) {
		if (req.params.id) {
			conn.query("SELECT * from catfish WHERE signin = ?", [req.params.id], (err, rows, result) => {
				if (err) console.log(err)
				if (rows[0] == undefined) {
					conn.query("INSERT INTO catfish SET signin = ?, report = ?", [req.params.id, 1], (err) => {
						if (err) console.log(err)
						req.session.success = req.params.id + ' was reported as a catfish account';
						res.redirect('/home')
					})
				} else if (rows[0].report >= 10) {
					conn.query("DELETE FROM user WHERE signin = ?", [req.params.signin], (err) => {
						if (err) console.log(err)
						req.session.success = req.params.id + ' was reported as a catfish account';
						res.redirect('/home')
					})
				} else {
					conn.query("UPDATE catfish SET report = report + 1 WHERE signin = ?", [req.params.id], (err) => {
						if (err) console.log(err)
						req.session.success = req.params.id + ' was reported as a catfish account';
						res.redirect('/home')
					})
				}
			})
		}
	} else {
		req.session.error = 'Please sign in';
		res.redirect('/')
	}
})

module.exports = router
