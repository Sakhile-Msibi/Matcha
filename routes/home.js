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
					else
						var skip2 = "non"
				} else {
					var skip = "non"
					var skip1 = "non"
					var skip2 = "non"
				}
			var signin = req.session.signin,
				gender = req.session.gender,
				age = req.session.age,
				interest = req.session.interest,
				descri = req.session.descri
				city = req.session.city
			conn.query("SELECT * from user WHERE signin != ?", [signin], (error, colums, resultat) => {
			if (error) console.log(error)
				if (colums.length != 0) {
					if (interest == "female" && gender == "male") {
						conn.query("SELECT signin, name, surname, gender, age, interest, description, profilePic FROM user WHERE gender = ? AND city = ? AND signin != ? AND profilePic IS NOT NULL AND (interest = ? OR interest = ?)", ["female", city, signin, "male", "both"], (err, rows, result) => {
							if (err) console.log(err)
							var profile = rows
							res.render('home', { title: 'Express', profile: profile, skip: skip, skip1: skip1, skip2: skip2})
						})
					} else if (interest == "male" && gender == "female") {
						conn.query("SELECT signin, name, surname, gender, age, interest, description, profilePic FROM user WHERE gender = ? AND city = ? AND signin != ? AND profilePic IS NOT NULL AND (interest = ? OR interest = ?)", ["male", city, signin, "female", "both"], (err, rows, result) => {
							if (err) console.log(err)
							var profile = rows
							res.render('home', { title: 'Express', profile: profile, skip: skip, skip1: skip1, skip2: skip2})
						})

					} else if (interest == "both" && gender == "male") {
						conn.query("SELECT signin, name, surname, gender, age, interest, description, profilePic FROM user WHERE (gender = ? OR gender = ?) AND city = ? AND signin != ? AND profilePic IS NOT NULL AND interest = ?", ["male", "female", city, signin, "male"], (err, rows, result) => {
							if (err) console.log(err)
							var profile = rows
							res.render('home', { title: 'Express', profile: profile, skip: skip, skip1: skip1, skip2: skip2})
						})

					} else if (interest == "both" && gender == "female") {
						conn.query("SELECT signin, name, surname, gender, age, interest, description, profilePic FROM user WHERE city = ? AND signin != ? AND profilePic IS NOT NULL AND interest = ?", [city, signin, "female"], (err, rows, result) => {
							if (err) console.log(err)
							var profile = rows
							res.render('home', { title: 'Express', profile: profile, skip: skip, skip1: skip1, skip2: skip2})
						})
					} else {
						conn.query("SELECT signin, name, surname, gender, age, interest, description, profilePic FROM user WHERE city = ? AND signin != ? AND profilePic IS NOT NULL", [city, signin], (err, rows, result) => {
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
			req.session.error = 'Complete your profile in order to proceed to this page';
			res.redirect('/profile');
		}
	} else {
		req.session.error = 'Please sign in';
		res.redirect('/')
	}
})

router.get('/tag', function(req, res, next) {
	if (req.session && req.session.signin) {
		let arr = []
		conn.query("SELECT tag FROM tag WHERE signin = ?", [req.session.signin], (err, rows, result) => {
			if (err) console.log(err)
			if (rows[0] != undefined) {
				var i = 0;
				var k = 0;
				while (rows[i]) {
					conn.query("SELECT signin from tag WHERE signin != ? AND tag = ?", [req.session.signin, rows[i].tag], (err1, rows1, result1) => {
						if (err) console.log(err)
						if (rows1.length != 0) {
							for (var j=0;rows1[j];j++) {
								arr[k] = rows1[j].signin
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
		req.session.error = 'Please sign in';
		res.redirect('/')
	}
})

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
				else
					var skip2 = "non"
			} else {
				var skip = "non"
				var skip1 = "non"
				var skip2 = "non"
			}
			conn.query("SELECT u.signin, u.name, u.surname, u.gender, u.age, u.interest, u.description, u.profilePic FROM user u INNER JOIN popularity p ON u.signin = p.signin WHERE u.city = ? AND u.signin != ? AND u.profilePic IS NOT NULL AND gender = ? AND (INTEREST = ? OR INTEREST = ?) ORDER BY p.popular DESC", [req.session.city, req.session.signin, req.session.interest, req.session.gender, "both"], (err, rows, result) => {
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
		req.session.error = 'Please sign in';
		res.redirect('/')
	}
})


router.get('/age', function(req, res, next) {
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
				else
					var skip2 = "non"
			} else {
				var skip = "non"
				var skip1 = "non"
				var skip2 = "non"
			}
			conn.query("SELECT signin, name, surname, gender, age, interest, description, profilePic FROM user WHERE city = ? AND signin != ? AND profilePic IS NOT NULL AND gender = ? AND (INTEREST = ? OR INTEREST = ?) ORDER BY age DESC", [req.session.city, req.session.signin, req.session.interest, req.session.gender, "both"], (err, rows, result) => {
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
		req.session.error = 'Please sign in';
		res.redirect('/')
	}
})

module.exports = router;
