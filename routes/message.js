<<<<<<< HEAD
var express = require('express'),
	connect = require('../config/database.js'),
	session = require('express-session'),
	router = express.Router()

router.get('/', function(req, res, next) {
	if (req.session && req.session.login) {
		connect.query("SELECT * FROM matched WHERE login = ? LIMIT 1", [req.session.login], (err, rows, result) => {
			if (err) console.log(err)
			if (rows[0] != undefined) {
				connect.query("SELECT m.matched, u.mainpic FROM matched m INNER JOIN user u ON m.matched = u.login WHERE m.login = ?", [req.session.login], (err1, rows1, result1) => {
=======
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
>>>>>>> 24fde18b2ec5a30375acf21a9993b93d4bb66971
					if (err) console.log(err)
					var matched = rows1
 					res.render('message', { title: 'Express', matched: matched })
				})
			} else {
<<<<<<< HEAD
				req.session.error = 'Personne n\'a match avec vous pour l\'instant!'
				res.redirect('/home')
			}
		})
	} else {
		req.session.error = 'Vous devez vous connecter pour acceder a cette page'
		res.redirect('/')
	}
})


router.get('/:id', function(req, res, next) {
	if (req.session && req.session.login) {
		connect.query("SELECT * FROM matched WHERE login = ? AND matched = ?", [req.session.login, req.params.id], (err, rows, result) => {
			if (err) console.log(err)
			if (rows[0] != undefined) {
				req.session.success = 'coucou'
				res.redirect('/message')
			} else {
				req.session.error = 'Personne n\'a match avec vous pour l\'instant!'
				res.redirect('/user/' + req.params.id)
			}
		})
	} else {
		req.session.error = 'Vous devez vous connecter pour acceder a cette page'
=======
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
>>>>>>> 24fde18b2ec5a30375acf21a9993b93d4bb66971
		res.redirect('/')
	}
})

router.get('/msg/:id', function(req, res, next) {
<<<<<<< HEAD
	if (req.session && req.session.login) {
=======
	if (req.session && req.session.signin) {
>>>>>>> 24fde18b2ec5a30375acf21a9993b93d4bb66971
		if (req.params.id) {
			var talkto = req.params.id
			res.render('chat', { title: 'Express' })
		} else {
<<<<<<< HEAD
			req.session.error = 'Aucun user n\'est selectionne'
			res.redirect('/message')
		}
	} else {
		req.session.error = 'Vous devez vous connecter pour acceder a cette page'
		res.redirect('/')
	}
})

module.exports = router
=======
			req.session.error = 'Please select a user';
			res.redirect('/message');
		}
	} else {
		req.session.error = 'Please sign in';
		res.redirect('/');
	}
});

module.exports = router;
>>>>>>> 24fde18b2ec5a30375acf21a9993b93d4bb66971
