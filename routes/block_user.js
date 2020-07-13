var express = require('express'),
	connect = require('../config/conn.js'),
	session = require('express-session'),
	router = express.Router()


router.get('/:id', function(req, res, next) {
	if (req.session && req.session.signin) {
		if (req.params.id) {
		connect.query("INSERT INTO blocked SET signin = ?, user = ?", [req.session.signin, req.params.id], (err) => {
			if (err) console.log(err)
			connect.query("DELETE FROM message WHERE user = ? AND signin = ?", [req.session.user, req.params.id], (err) => {
			 if (err) console.log(err)
			 connect.query("DELETE FROM message WHERE user = ? AND signin = ?", [req.params.id, req.session.user], (err) => {
			  if (err) console.log(err)
			  connect.query("DELETE FROM liked WHERE user = ? AND signin = ?", [req.params.id, req.session.user], (err) => {
			   if (err) console.log(err)
			   connect.query("DELETE FROM liked WHERE user = ? AND signin = ?", [req.session.user, req.params.id], (err) => {
			    if (err) console.log(err)
				connect.query("DELETE FROM matched WHERE user = ? AND signin = ?", [req.session.user, req.params.id], (err) => {
				 if (err) console.log(err)
				 connect.query("DELETE FROM matched WHERE user = ? AND signin = ?", [req.params.id, req.session.user], (err) => {
				  if (err) console.log(err)
				  connect.query("DELETE FROM notice WHERE user = ? AND signin = ?", [req.params.id, req.session.user], (err) => {
				   if (err) console.log(err)
				   connect.query("DELETE FROM notice WHERE user = ? AND signin = ?", [req.session.user, req.params.id], (err) => {
				    if (err) console.log(err)
					req.session.error = req.params.id + ' a ete block'
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
