var express = require('express'),
	conn = require('../config/conn.js'),
	session = require('express-session'),
	router = express.Router()

router.get('/', function(req, res, next) {
	if (req.session && req.session.signin) {
		var skip = "non"
		var skip1 = "non"
		var skip2 = "non"
		var profile = undefined
		res.render('search_user', { profile: profile, skip: skip, skip1: skip1, skip2: skip2 })
	} else {
		req.session.error = 'Please sign in';
		res.redirect('/')
	}
})

router.get('/tag', function(req, res, next) {
	if (req.session && req.session.signin) {
		var tag = req.query.tag
		if (tag) {
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
				if (tag.length > 15) {
					req.session.error = 'A tag must be less than 15 characters';
					res.redirect('/search_user');
				} else if (tag.length < 3) {
					req.session.error = 'A tag must contain at least 3 characters';
					res.redirect('/search_user');
				} else {
					conn.query("SELECT u.signin, u.name, u.surname, u.gender, u.age, u.interest, u.description, u.profilePic FROM user u INNER JOIN tag t ON t.signin = u.signin WHERE t.tag = ? AND u.signin != ? AND u.profilePic IS NOT NULL AND u.gender = ? AND (INTEREST = ? OR INTEREST = ?)", [tag, req.session.signin, req.session.interest, req.session.gender, "both"], (err, rows, result) => {
						if (err) console.log(err)
						if (rows != undefined) {
							var profile = rows
							res.render('search_user', { title: 'Express', profile: profile, skip: skip, skip1: skip1, skip2: skip2 })
						} else {
							req.session.info = 'No user matches this tag';
							res.redirect('/search_user');
						}
					})
				}
			})
		} else {
			req.session.error = 'This is a bad tag';
			res.redirect('/search_user');
		}
	} else {
		req.session.error = 'Please sign in';
		res.redirect('/')
	}
})

router.get('/city', function(req, res, next) {
	if (req.session && req.session.signin) {
		var city = req.query.city
		if (city) {
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
				if (city.length > 15) {
					req.session.error = 'The name of a city must contain less than 14 characters';
					res.redirect('/search_user');
				} else if (city.length < 3) {
					req.session.error = 'A name of a city must contain at least 3 characters';
					res.redirect('/search_user');
				} else {
					conn.query("SELECT signin, name, surname, gender, age, interest, description, profilePic FROM user WHERE city = ? AND signin != ? AND profilePic IS NOT NULL AND gender = ? AND (INTEREST = ? OR INTEREST = ?)", [city, req.session.signin, req.session.interest, req.session.gender, "both"], (err, rows, result) => {
						if (err) console.log(err)
						if (rows != undefined) {
							var profile = rows
							res.render('search_user', { title: 'Express', profile: profile, skip: skip, skip1: skip1, skip2: skip2 })
						} else {
							req.session.info = 'No user matches this city';
							res.redirect('/search_user');
						}
					})
				}
			});
		} else {
			req.session.error = 'This is a bad city';
			res.redirect('/search_user');
		}
	} else {
		req.session.error = 'Please sign in';
		res.redirect('/')
	}
})


router.get('/age', function(req, res, next) {
	if (req.session && req.session.signin) {
		var max = req.query.max
		var min = req.query.min
		if (max && min) {
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
				if (min < 18) {
					req.session.error = 'Too young';
					res.redirect('/search_user');
				} else if (max >= 55) {
					req.session.error = "Too old";
					res.redirect('/search_user');
				} else if (min > max) {
					req.session.error = "Minimum age is higher than the maximum age";
					res.redirect('/search');
				} else {
					conn.query("SELECT signin, name, surname, gender, age, interest, description, profilePic FROM user WHERE city = ? AND signin != ? AND profilePic IS NOT NULL AND gender = ? AND (INTEREST = ? OR INTEREST = ?) AND age BETWEEN ? AND ?", [req.session.city, req.session.signin, req.session.interest, req.session.gender, "both", min, max], (err, rows, result) => {
						if (err) console.log(err)
						if (rows != undefined) {
							var profile = rows
							res.render('search_user', { title: 'Express', profile: profile, skip: skip, skip1: skip1, skip2: skip2 })
						} else {
							req.session.info = 'No user matches this age';
							res.redirect('/search_user');
						}
					})	
				}
			})
		} else {
			req.session.error = 'This is a bad age range to choose';
			res.redirect('/search_user');
		}
	} else {
		req.session.error = 'Please sign in';
		res.redirect('/')
	}
})

router.get('/popular', function(req, res, next) {
	if (req.session && req.session.signin) {
		var max = req.query.fmax
		var min = req.query.fmin
		if (max && min) {
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
				if (min < 10) {
					req.session.error = 'Too small';
					res.redirect('/search_user');
				} else if (max >= 1000) {
					req.session.error = "Too large";
					res.redirect('/search_user');
				} else if (min > max) {
					req.session.error = "Minimum popularity is larger than maximum popularity";
					res.redirect('/search_user');
				} else {
			conn.query("SELECT u.signin, u.name, u.surname, u.gender, u.age, u.interest, u.description, u.profilePic FROM user u INNER JOIN popularity p ON u.signin = p.signin WHERE u.city = ? AND u.signin != ? AND u.profilePic IS NOT NULL AND gender = ? AND (INTEREST = ? OR INTEREST = ?) AND p.popular BETWEEN ? AND ?", [req.session.city, req.session.signin, req.session.interest, req.session.gender, "both", min, max], (err, rows, result) => {
						if (err) console.log(err)
						if (rows != undefined) {
							var profile = rows
							res.render('search_user', { title: 'Express', profile: profile, skip: skip, skip1: skip1, skip2: skip2 })
						} else {
							req.session.info = 'No user matches this popularity range';
							res.redirect('/search_user');
						}
					})	
				}
			})
		} else {
			req.session.error = 'This is not a good popularity range';
			res.redirect('/search_user');
		}
	} else {
		req.session.error = 'Please sign in';
		res.redirect('/');
	}
});

module.exports = router;
