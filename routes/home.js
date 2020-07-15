<<<<<<< HEAD
var express = require('express'),
	connect = require('../config/database.js'),
	session = require('express-session'),
	router = express.Router()

router.get('/', function(req, res, next) {
	if (req.session && req.session.login) {
		if (req.session.ok) {
			connect.query("SELECT login FROM blocked WHERE user = ?", [req.session.login], (err, rows0, result) => {
				if (err) console.log(err)
				if (rows0[0] != undefined) {
					var skip = rows0[0].login
					if (rows0[1] != undefined)
						var skip1 = rows0[1].login
					else
						var skip1 = "non"
					if (rows0[2] != undefined)
						var skip2 = rows0[2].login
=======
var conn = require('../config/conn.js');
var express = require('express');
var session = require('express-session');
var router = express.Router();

router.get('/', function(req, res, next) {
	if (req.session && req.session.signin) {
		if (req.session.ok) {
			conn.query("SELECT signin FROM blocked WHERE user = ?", [req.session.signin], (err, rows0, result) => {
				if (err) console.log(err)
				if (rows0[0] != undefined) {
					var skip = rows0[0].signin
					if (rows0[1] != undefined)
						var skip1 = rows0[1].signin
					else
						var skip1 = "non"
					if (rows0[2] != undefined)
						var skip2 = rows0[2].signin
>>>>>>> 24fde18b2ec5a30375acf21a9993b93d4bb66971
					else
						var skip2 = "non"
				} else {
					var skip = "non"
					var skip1 = "non"
					var skip2 = "non"
				}
<<<<<<< HEAD
			var login = req.session.login,
				sexe = req.session.sexe,
=======
			var signin = req.session.signin,
				gender = req.session.gender,
>>>>>>> 24fde18b2ec5a30375acf21a9993b93d4bb66971
				age = req.session.age,
				interest = req.session.interest,
				descri = req.session.descri
				city = req.session.city
<<<<<<< HEAD
			connect.query("SELECT * from user WHERE login != ?", [login], (error, colums, resultat) => {
			if (error) console.log(error)
				if (colums.length != 0) {
					if (interest == "female" && sexe == "male") {
						connect.query("SELECT login, name, lastname, sexe, age, interest, description, mainpic FROM user WHERE sexe = ? AND city = ? AND login != ? AND mainpic IS NOT NULL AND (interest = ? OR interest = ?)", ["female", city, login, "male", "both"], (err, rows, result) => {
=======
			conn.query("SELECT * from user WHERE signin != ?", [signin], (error, colums, resultat) => {
			if (error) console.log(error)
				if (colums.length != 0) {
					if (interest == "female" && gender == "male") {
						conn.query("SELECT signin, name, surname, gender, age, interest, description, profilePic FROM user WHERE gender = ? AND city = ? AND signin != ? AND profilePic IS NOT NULL AND (interest = ? OR interest = ?)", ["female", city, signin, "male", "both"], (err, rows, result) => {
>>>>>>> 24fde18b2ec5a30375acf21a9993b93d4bb66971
							if (err) console.log(err)
							var profile = rows
							res.render('home', { title: 'Express', profile: profile, skip: skip, skip1: skip1, skip2: skip2})
						})
<<<<<<< HEAD
					} else if (interest == "male" && sexe == "female") {
						connect.query("SELECT login, name, lastname, sexe, age, interest, description, mainpic FROM user WHERE sexe = ? AND city = ? AND login != ? AND mainpic IS NOT NULL AND (interest = ? OR interest = ?)", ["male", city, login, "female", "both"], (err, rows, result) => {
=======
					} else if (interest == "male" && gender == "female") {
						conn.query("SELECT signin, name, surname, gender, age, interest, description, profilePic FROM user WHERE gender = ? AND city = ? AND signin != ? AND profilePic IS NOT NULL AND (interest = ? OR interest = ?)", ["male", city, signin, "female", "both"], (err, rows, result) => {
>>>>>>> 24fde18b2ec5a30375acf21a9993b93d4bb66971
							if (err) console.log(err)
							var profile = rows
							res.render('home', { title: 'Express', profile: profile, skip: skip, skip1: skip1, skip2: skip2})
						})

<<<<<<< HEAD
					} else if (interest == "both" && sexe == "male") {
						connect.query("SELECT login, name, lastname, sexe, age, interest, description, mainpic FROM user WHERE (sexe = ? OR sexe = ?) AND city = ? AND login != ? AND mainpic IS NOT NULL AND interest = ?", ["male", "female", city, login, "male"], (err, rows, result) => {
=======
					} else if (interest == "both" && gender == "male") {
						conn.query("SELECT signin, name, surname, gender, age, interest, description, profilePic FROM user WHERE (gender = ? OR gender = ?) AND city = ? AND signin != ? AND profilePic IS NOT NULL AND interest = ?", ["male", "female", city, signin, "male"], (err, rows, result) => {
>>>>>>> 24fde18b2ec5a30375acf21a9993b93d4bb66971
							if (err) console.log(err)
							var profile = rows
							res.render('home', { title: 'Express', profile: profile, skip: skip, skip1: skip1, skip2: skip2})
						})

<<<<<<< HEAD
					} else if (interest == "both" && sexe == "female") {
						connect.query("SELECT login, name, lastname, sexe, age, interest, description, mainpic FROM user WHERE city = ? AND login != ? AND mainpic IS NOT NULL AND interest = ?", [city, login, "female"], (err, rows, result) => {
=======
					} else if (interest == "both" && gender == "female") {
						conn.query("SELECT signin, name, surname, gender, age, interest, description, profilePic FROM user WHERE city = ? AND signin != ? AND profilePic IS NOT NULL AND interest = ?", [city, signin, "female"], (err, rows, result) => {
>>>>>>> 24fde18b2ec5a30375acf21a9993b93d4bb66971
							if (err) console.log(err)
							var profile = rows
							res.render('home', { title: 'Express', profile: profile, skip: skip, skip1: skip1, skip2: skip2})
						})
					} else {
<<<<<<< HEAD
						connect.query("SELECT login, name, lastname, sexe, age, interest, description, mainpic FROM user WHERE city = ? AND login != ? AND mainpic IS NOT NULL", [city, login], (err, rows, result) => {
=======
						conn.query("SELECT signin, name, surname, gender, age, interest, description, profilePic FROM user WHERE city = ? AND signin != ? AND profilePic IS NOT NULL", [city, signin], (err, rows, result) => {
>>>>>>> 24fde18b2ec5a30375acf21a9993b93d4bb66971
							if (err) console.log(err)
							var profile = rows
							res.render('home', { title: 'Express', profile: profile, skip: skip, skip1: skip1, skip2: skip2})
						})

					}
				} else {
					var profile = undefined
					res.render('home', { title: 'Express', profile: profile})
				}
			})
			})
		} else {
<<<<<<< HEAD
			req.session.error = 'Vous devez completer votre profil pour aller sur cette page.'
			res.redirect('/profil')
		}
	} else {
		req.session.error = 'Vous devez vous connecter'
=======
			req.session.error = 'Complete your profile in order to proceed to this page';
			res.redirect('/profile');
		}
	} else {
		req.session.error = 'Please sign in';
>>>>>>> 24fde18b2ec5a30375acf21a9993b93d4bb66971
		res.redirect('/')
	}
})

router.get('/tag', function(req, res, next) {
<<<<<<< HEAD
	if (req.session && req.session.login) {
		let arr = []
		connect.query("SELECT tag FROM tag WHERE login = ?", [req.session.login], (err, rows, result) => {
=======
	if (req.session && req.session.signin) {
		let arr = []
		conn.query("SELECT tag FROM tag WHERE signin = ?", [req.session.signin], (err, rows, result) => {
>>>>>>> 24fde18b2ec5a30375acf21a9993b93d4bb66971
			if (err) console.log(err)
			if (rows[0] != undefined) {
				var i = 0;
				var k = 0;
				while (rows[i]) {
<<<<<<< HEAD
					connect.query("SELECT login from tag WHERE login != ? AND tag = ?", [req.session.login, rows[i].tag], (err1, rows1, result1) => {
						if (err) console.log(err)
						if (rows1.length != 0) {
							for (var j=0;rows1[j];j++) {
								arr[k] = rows1[j].login
=======
					conn.query("SELECT signin from tag WHERE signin != ? AND tag = ?", [req.session.signin, rows[i].tag], (err1, rows1, result1) => {
						if (err) console.log(err)
						if (rows1.length != 0) {
							for (var j=0;rows1[j];j++) {
								arr[k] = rows1[j].signin
>>>>>>> 24fde18b2ec5a30375acf21a9993b93d4bb66971
								k++;
							}
						}
					})
					i++
				}
			}
			res.redirect('/home')
		})
	} else {
<<<<<<< HEAD
		req.session.error = 'Vous devez vous connecter'
=======
		req.session.error = 'Please sign in';
>>>>>>> 24fde18b2ec5a30375acf21a9993b93d4bb66971
		res.redirect('/')
	}
})

<<<<<<< HEAD
router.get('/famous', function(req, res, next) {
	if (req.session && req.session.login) {
		connect.query("SELECT login FROM blocked WHERE user = ?", [req.session.login], (err, rows0, result) => {
			if (err) console.log(err)
			if (rows0[0] != undefined) {
				var skip = rows0[0].login
				if (rows0[1] != undefined)
					var skip1 = rows0[1].login
				else
					var skip1 = "non"
				if (rows0[2] != undefined)
					var skip2 = rows0[2].login
=======
router.get('/popular', function(req, res, next) {
	if (req.session && req.session.signin) {
		conn.query("SELECT signin FROM blocked WHERE user = ?", [req.session.signin], (err, rows0, result) => {
			if (err) console.log(err)
			if (rows0[0] != undefined) {
				var skip = rows0[0].signin
				if (rows0[1] != undefined)
					var skip1 = rows0[1].signin
				else
					var skip1 = "non"
				if (rows0[2] != undefined)
					var skip2 = rows0[2].signin
>>>>>>> 24fde18b2ec5a30375acf21a9993b93d4bb66971
				else
					var skip2 = "non"
			} else {
				var skip = "non"
				var skip1 = "non"
				var skip2 = "non"
			}
<<<<<<< HEAD
			connect.query("SELECT u.login, u.name, u.lastname, u.sexe, u.age, u.interest, u.description, u.mainpic FROM user u INNER JOIN popularity p ON u.login = p.login WHERE u.city = ? AND u.login != ? AND u.mainpic IS NOT NULL AND sexe = ? AND (INTEREST = ? OR INTEREST = ?) ORDER BY p.famous DESC", [req.session.city, req.session.login, req.session.interest, req.session.sexe, "both"], (err, rows, result) => {
=======
			conn.query("SELECT u.signin, u.name, u.surname, u.gender, u.age, u.interest, u.description, u.profilePic FROM user u INNER JOIN popularity p ON u.signin = p.signin WHERE u.city = ? AND u.signin != ? AND u.profilePic IS NOT NULL AND gender = ? AND (INTEREST = ? OR INTEREST = ?) ORDER BY p.popular DESC", [req.session.city, req.session.signin, req.session.interest, req.session.gender, "both"], (err, rows, result) => {
>>>>>>> 24fde18b2ec5a30375acf21a9993b93d4bb66971
				if (rows[0] != undefined) {
					var profile = rows
					res.render('home', { title: 'Express', profile: profile, skip: skip, skip1: skip1, skip2: skip2 })
				} else {
					var profile = undefined
					res.redirect('/home')
				}
			})
		})
	} else {
<<<<<<< HEAD
		req.session.error = 'Vous devez vous connecter'
=======
		req.session.error = 'Please sign in';
>>>>>>> 24fde18b2ec5a30375acf21a9993b93d4bb66971
		res.redirect('/')
	}
})


router.get('/age', function(req, res, next) {
<<<<<<< HEAD
	if (req.session && req.session.login) {
		connect.query("SELECT login FROM blocked WHERE user = ?", [req.session.login], (err, rows0, result) => {
			if (err) console.log(err)
			if (rows0[0] != undefined) {
				var skip = rows0[0].login
				if (rows0[1] != undefined)
					var skip1 = rows0[1].login
				else
					var skip1 = "non"
				if (rows0[2] != undefined)
					var skip2 = rows0[2].login
=======
	if (req.session && req.session.signin) {
		conn.query("SELECT signin FROM blocked WHERE user = ?", [req.session.signin], (err, rows0, result) => {
			if (err) console.log(err)
			if (rows0[0] != undefined) {
				var skip = rows0[0].signin
				if (rows0[1] != undefined)
					var skip1 = rows0[1].signin
				else
					var skip1 = "non"
				if (rows0[2] != undefined)
					var skip2 = rows0[2].signin
>>>>>>> 24fde18b2ec5a30375acf21a9993b93d4bb66971
				else
					var skip2 = "non"
			} else {
				var skip = "non"
				var skip1 = "non"
				var skip2 = "non"
			}
<<<<<<< HEAD
			connect.query("SELECT login, name, lastname, sexe, age, interest, description, mainpic FROM user WHERE city = ? AND login != ? AND mainpic IS NOT NULL AND sexe = ? AND (INTEREST = ? OR INTEREST = ?) ORDER BY age DESC", [req.session.city, req.session.login, req.session.interest, req.session.sexe, "both"], (err, rows, result) => {
=======
			conn.query("SELECT signin, name, surname, gender, age, interest, description, profilePic FROM user WHERE city = ? AND signin != ? AND profilePic IS NOT NULL AND gender = ? AND (INTEREST = ? OR INTEREST = ?) ORDER BY age DESC", [req.session.city, req.session.signin, req.session.interest, req.session.gender, "both"], (err, rows, result) => {
>>>>>>> 24fde18b2ec5a30375acf21a9993b93d4bb66971
				if (rows[0] != undefined) {
					var profile = rows
					res.render('home', { title: 'Express', profile: profile, skip: skip, skip1: skip1, skip2: skip2 })
				} else {
					var profile = undefined
					res.redirect('/home')
				}
			})
		})
	} else {
<<<<<<< HEAD
		req.session.error = 'Vous devez vous connecter'
=======
		req.session.error = 'Please sign in';
>>>>>>> 24fde18b2ec5a30375acf21a9993b93d4bb66971
		res.redirect('/')
	}
})

<<<<<<< HEAD
module.exports = router
=======
module.exports = router;
>>>>>>> 24fde18b2ec5a30375acf21a9993b93d4bb66971
