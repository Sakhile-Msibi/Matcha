var express = require('express'),
	connect = require('../config/conn.js'),
	session = require('express-session'),
	bcrypt = require('bcryptjs'),
	router = express.Router()

router.get('/', function(req, res, next) {
	res.render('signin', { title: 'Express' })
})

router.post('/', function(req, res) {
	if (req.session && req.session.signin) {
		req.session.error = 'Access denied';
		res.redirect('/home')
	} else {
	var signin = req.body.signin,
		pswd = req.body.pswd
	var RegexMin = /[a-z]/,
		RegexMax = /[A-Z]/,
		RegexMore = /[a-zA-Z-0-9\#\$\%\^\&\*\,\.]/
	if (signin && pswd) {
		connect.query("SELECT * FROM user WHERE signin = ? LIMIT 1", [signin], (err, rows, result) => {
			if (err) {
				req.session.error = 'Le nom d\'utilisateur ou le mot de passe n\'exise pas!'
				res.redirect('/signin')
			} else if (!pswd.search(/\d/)) {
				req.session.error = 'Le mot de passe doit contenir au moins un chiffre!'
				res.redirect('/signin')
			} else if (pswd.search(RegexMin) == -1) {
				req.session.error = 'Le mot de passe doit contenir au moins une minuscule!'
				res.redirect('/signin')
			} else if (pswd.search(RegexMax) == -1) {
				req.session.error = 'Le mot de passe doit contenir au moins une majuscule!'
				res.redirect('/signin')
			} else if (pswd.search(RegexMore) == -1) {
				req.session.error = 'Le mot de passe ne peux pas contenir de caracteres spéciaux mise a part #, $, %, ^, &, *, ,, et . '
				res.redirect('/signin')
			} else if (pswd.length < 6) {
				req.session.error = 'Le mot de passe doit contenir au minimum 6 caracteres!'
				res.redirect('/signin')
			} else if (pswd.length > 15) {
				req.session.error = 'Le mot de passe doit contenir au maximum 15 caracteres!'
				res.redirect('/signin')
			} else if (rows[0]) {
				connect.query("UPDATE user SET online = 1 WHERE signin = ?", [signin], (err) => {
					if (err) console.log(err)
				})
                if (bcrypt.compareSync(pswd, rows[0].passwd)) { 
					req.session.signin = signin.toLowerCase()
					if (rows[0].profilePic) {
						req.session.ok = true
						req.session.orientation = rows[0].orientation
						req.session.surname = rows[0].surname
						req.session.name = rows[0].name
						req.session.gender = rows[0].gender
						req.session.profilePic = rows[0].profilePic
						req.session.age = rows[0].age
						req.session.interest = rows[0].interest
						req.session.city = rows[0].city
						req.session.log = true
						connect.query("UPDATE popularity SET popular = popular + 5 WHERE signin = ?", [signin], (err) => {
							if (err) console.log(err)
						})
						connect.query("UPDATE user SET online = 1, connect = ? WHERE signin = ?", [new Date(), signin], (err) => {
							if (err) threw (err)
						})
						req.session.success = "Vous êtes maintenant connecté"
						res.redirect('/home')
					} else {
						req.session.ok = false
						req.session.gender = rows[0].gender
						req.session.surname = rows[0].surname
						req.session.name = rows[0].name
						req.session.interest = rows[0].interest
						req.session.city = rows[0].city
						req.session.age = rows[0].age
						req.session.info = 'Veuillez remplir vos informations personnelles.'
						connect.query("UPDATE user SET online = 1, connect = ? WHERE signin = ?", [new Date(), signin], (err) => {
							if (err) threw (err)
						})

						req.session.success = "Vous êtes maintenant connecté"
						req.session.log = true
						res.redirect('/profile')
					}
				} else {
					req.session.error = 'Le mot de passe ou le nom d\'utilisateur n\'existe pas.'
					res.redirect('/signin')
				}
			} else {
				req.session.error = 'Le nom d\'utilisateur ou le mot de passe n\'exise pas.'
				res.redirect('/signin')
			}
		})
	} else {
		req.session.error = 'Please complete all fields.'
		res.redirect('/signin')
	}
	}
})

module.exports = router
