var conn = require('../config/conn.js');
var express = require('express');
var session = require('express-session');
var router = express.Router();


router.get('/:id', function(req, res, next) {
	if (req.session && req.session.signin) {
		if (req.params.id) {
		conn.query("INSERT INTO blocked SET signin = ?, user = ?", [req.session.signin, req.params.id], (err) => {
			if (err) console.log(err)
			conn.query("DELETE FROM message WHERE user = ? AND signin = ?", [req.session.user, req.params.id], (err) => {
			 if (err) console.log(err)
			 conn.query("DELETE FROM message WHERE user = ? AND signin = ?", [req.params.id, req.session.user], (err) => {
			  if (err) console.log(err)
			  conn.query("DELETE FROM liked WHERE user = ? AND signin = ?", [req.params.id, req.session.user], (err) => {
			   if (err) console.log(err)
			   conn.query("DELETE FROM liked WHERE user = ? AND signin = ?", [req.session.user, req.params.id], (err) => {
			    if (err) console.log(err)
				conn.query("DELETE FROM matched WHERE user = ? AND signin = ?", [req.session.user, req.params.id], (err) => {
				 if (err) console.log(err)
				 conn.query("DELETE FROM matched WHERE user = ? AND signin = ?", [req.params.id, req.session.user], (err) => {
				  if (err) console.log(err)
				  conn.query("DELETE FROM notice WHERE user = ? AND signin = ?", [req.params.id, req.session.user], (err) => {
				   if (err) console.log(err)
				   conn.query("DELETE FROM notice WHERE user = ? AND signin = ?", [req.session.user, req.params.id], (err) => {
				    if (err) console.log(err)
					req.session.error = req.params.id + ' was blocked';
					res.redirect('/user/' + req.params.id)
				   })
				  })
			     })
				})
			   })
			  })
			 })
			})
		   })
		} else {
			req.session.error = 'An error has occurred';
			res.redirect('/profile/' + req.params.id)
		}
	} else {
		req.session.error = 'Please sign in';
		res.redirect('/')
	}
})

module.exports = router;
