var express = require('express'),
	connect = require('../config/conn.js'),
	session = require('express-session'),
	router = express.Router()

router.get('/:id', function(req, res, next) {
	if (req.session && req.session.signin) {
		if (req.params.id) {
			if (req.session.signin != req.params.id) {
				connect.query("DELETE FROM blocked WHERE user = ? AND signin = ?", [req.params.id, req.session.signin], (err) => {
					if (err) console.log(err)
					req.session.success = req.params.id + " n\'est plus block"
					res.redirect('/home')
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
