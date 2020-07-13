var express = require('express'),
	connect = require('../config/conn.js'),
	session = require('express-session'),
	router = express.Router()

router.get('/:id', function(req, res, next) {
	if (req.session && req.session.signin) {
		if (req.params.id) {
			connect.query("SELECT * from catfish WHERE signin = ?", [req.params.id], (err, rows, result) => {
				if (err) console.log(err)
				if (rows[0] == undefined) {
					connect.query("INSERT INTO catfish SET signin = ?, report = ?", [req.params.id, 1], (err) => {
						if (err) console.log(err)
						req.session.success = req.params.id + ' was reported as a catfish account';
						res.redirect('/home')
					})
				} else if (rows[0].report >= 10) {
					connect.query("DELETE FROM user WHERE signin = ?", [req.params.signin], (err) => {
						if (err) console.log(err)
						req.session.success = req.params.id + ' was reported as a catfish account';
						res.redirect('/home')
					})
				} else {
					connect.query("UPDATE catfish SET report = report + 1 WHERE signin = ?", [req.params.id], (err) => {
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
