var conn = require('../config/conn.js');
var express = require('express');
var session = require('express-session');
var router = express.Router();

var views;
router.get('/:id', function(req, res, next) {
	if (req.session && req.session.signin) {
		if (req.params.id) {
			var signin = req.params.id
			if (signin) {
				conn.query("SELECT * from blocked WHERE signin = ? AND user = ?", [signin, req.session.signin], (err, rows, result) => {
					if (err) console.log(err)
					if (rows[0] == undefined) {
					conn.query("SELECT * from user WHERE signin = ?", [signin], (err, rows, result) => {
					if (err) console.log(err)
					if (rows) {
						conn.query("SELECT * from tag WHERE signin = ?", [signin], (err1, rows1, result1) => {
							if (err1) console.log(err1)
							var UserTag = rows1
							var name = rows[0].name,
								surname = rows[0].surname,
								gender = rows[0].gender,
								sexual_preference = rows[0].sexual_preference,
								age = rows[0].age,
								mainpic1 = rows[0].profilePic,
								online = rows[0].online,
								connected = rows[0].connect,
								descri = rows[0].description
							req.session.login2 = req.params.id
							conn.query("SELECT * FROM liked WHERE signin = ? AND liked = ?", [req.session.signin, signin], (err2, rows2, result2) => {
								if (err) console.log(err)
								if (rows2[0] != undefined) {
									res.locals.liked = "ok"
									conn.query("SELECT * FROM liked WHERE signin = ? AND liked = ?", [signin, req.session.signin], (err3, rows3, res3) => {
										if (err) console.log(err)
										if (rows3[0] != undefined) {
											req.session.chat = "ok"
										}
									})
								} else {
									res.locals.liked = undefined
								}
						conn.query("SELECT photo1, photo2, photo3, photo4 FROM user WHERE signin = ?", [signin], (err, rows3, result) => {
							if (err) console.log(err)
							conn.query("SELECT user FROM blocked WHERE signin = ? AND user = ?", [req.session.signin, signin], (err, rows5, result) => {
								if (err) console.log(err)
								if (rows5[0] != undefined) {
									var blocked = "yes"
								} else {
									var blocked = "no"
								}
								conn.query("SELECT popular FROM popularity WHERE signin = ?", [signin], (err, rows, result) => {
									if (err) console.log(err)
									var popular = rows[0].popular
									if (views != signin && signin != req.session.signin) {
										var msg = req.session.signin + ' visited your profile';
										conn.query("INSERT INTO notice SET signin = ?, sendDate = ?, type = ?, msg = ?, readed = 0", [signin, new Date(), "views", msg], (err, rows, result) => {
											if (err) console.log(err)
											res.io.to(global.people[signin]).emit('notice')
											views = signin;
										})
									}
									res.render('user', { title: 'Express', online: online, UserTag: UserTag, age: age, login2: signin, name: name, surname: surname, gender: gender, sexual_preference: sexual_preference, mainpic1: mainpic1, descri: descri, mine: req.session.signin, photo1: rows3[0].photo1, photo2: rows3[0].photo2, photo3: rows3[0].photo3, photo4: rows3[0].photo4, blocked: blocked, popular: popular, connected: connected })
								});
								});
							});
							});
						});
					} else {
						req.session.error = 'The user does not exist';
						res.redirect('/profile')
					}
				});
				} else {
					req.session.error = 'This user has blocked you';
					res.redirect('/home')
				}
			});
			} else {
				req.session.error = 'An error has occurred';
				res.redirect('/profile/' + req.params.id)
			}
		} else {
			req.session.error = 'An error has occurred';
			res.redirect('/profile/' + req.params.id)
		}
	} else {
		req.session.error = 'Please sign in';
		res.redirect('/')
	}
});

router.post('/like', function(req, res, next) {
	if (req.session && req.session.signin) {
		if (req.session.ok) {
			conn.query("INSERT INTO liked set liked = ?, signin = ?", [req.session.login2, req.session.signin], (err) => {
				if (err) console.log(err)
				var notiflike = req.session.signin + ' you like';
				conn.query("INSERT INTO notice SET signin = ?, sendDate = ?, type = ?, msg = ?, readed = 0", [req.session.login2, new Date(), "like", notiflike], (err) => {
					if (err) console.log(err)
					res.io.to(global.people[req.session.login2]).emit('notice')
				conn.query("UPDATE popularity SET popular = popular + 5 WHERE signin = ?", [req.session.signin], (err) => {
					if (err) console.log(err)
					conn.query("SELECT * FROM liked WHERE signin = ? AND liked = ?", [req.session.login2, req.session.signin], (err3, rows3, res3) => {
						if (err) console.log(err)
						if (rows3[0] != undefined) {
							conn.query("INSERT INTO matched SET signin = ?, matched = ?", [req.session.signin, req.session.login2], (err) => {
								if (err) console.log(err)
								conn.query("INSERT INTO matched SET signin = ?, matched = ?", [req.session.login2, req.session.signin], (err) => {
									if (err) console.log(err)
									conn.query("UPDATE popularity SET popular = popular + 15 WHERE signin = ?", [req.session.signin], (err) => {
										if (err) console.log(err)
									var notifmatch = 'You have match with ' + req.session.login2
									var notif2match = 'You have match with ' + req.session.signin
									conn.query("INSERT INTO notice SET signin = ?, sendDate = ?, type = ?, msg = ?, readed = 0", [req.session.signin, new Date(), "match", notifmatch], (err) => {
									res.io.to(global.people[req.session.signin]).emit('notice')
										if (err) console.log(err)
									conn.query("INSERT INTO notice SET signin = ?, sendDate = ?, type = ?, msg = ?, readed = 0", [req.session.login2, new Date(), "match", notif2match], (err) => {
										if (err) console.log(err)
										res.io.to(global.people[req.session.login2]).emit('notice')
										req.session.success = 'You like ' + req.session.login2
										req.session.success = 'You have match with ' + req.session.login2
										req.session.info = 'You can now communicate with ' + req.session.login2
										req.session.chat = "ok"
										res.redirect('/user/'+ req.session.login2)
									})
									})
								})
							})
							})
						} else {
								req.session.success = 'You like ' + req.session.login2
								res.redirect('/user/'+ req.session.login2)
						}
					})
				})
				})
			})
		} else {
			req.session.error = 'You must first complete your profile';
			res.redirect('/profile')
		}
	} else {
		req.session.error = 'Please sign in';
		res.redirect('/')
	}
})

router.post('/unlike', function(req, res, next) {
	if (req.session && req.session.signin) {
		if (req.session.ok) {
			conn.query('DELETE FROM liked WHERE liked = ? AND signin = ?', [req.session.login2, req.session.signin], (err) => {
				if (err) console.log(err)
				var notifunlike = req.session.signin + ' you have unlike';
			conn.query("INSERT INTO notice SET signin = ?, sendDate = ?, type = ?, msg = ?, readed = 0", [req.session.login2, new Date(), "unlike", notifunlike], (err) => {
				if (err) console.log(err)
				res.io.to(global.people[req.session.login2]).emit('notice')
				conn.query("UPDATE popularity SET popular = popular - 5 WHERE signin = ?", [req.session.signin], (err) => {
					if (err) console.log(err)
					res.locals.liked = undefined
					conn.query("SELECT * FROM matched WHERE signin = ? AND matched = ?", [req.session.signin, req.session.login2], (err, rows, result) => {
						if (err) console.log(err)
						if (rows[0] != undefined) {
							conn.query("DELETE FROM matched WHERE signin = ? AND matched = ?", [req.session.signin, req.session.login2], (err) => {
								if (err) console.log(err)
								conn.query("DELETE FROM matched WHERE signin = ? AND matched = ?", [req.session.login2, req.session.signin], (err) => {
									if (err) console.log(err)
									var notifunmatch = 'You have unmatch with ' + req.session.login2
									var notifunmatch2 = 'You have unmatch with ' + req.session.signin
									conn.query("INSERT INTO notice SET signin = ?, sendDate = ?, type = ?, msg = ?, readed = 0", [req.session.signin, new Date(), "unmatch", notifunmatch], (err) => {
										if (err) console.log(err)
										res.io.to(global.people[req.session.signin]).emit('notice')
										conn.query("INSERT INTO notice SET signin = ?, sendDate = ?, type = ?, msg = ?, readed = 0", [req.session.login2, new Date(), "unmatch", notifunmatch2], (err) => {
											res.io.to(global.people[req.session.login2]).emit('notice')
											if (err) console.log(err)
											req.session.success = 'You have unlike ' + req.session.login2
											req.session.success = 'You have unmatch with ' + req.session.login2
											res.redirect('/user/'+ req.session.login2)
										})
									})
								})
							})
						} else {
							req.session.success = 'You have unlike ' + req.session.login2
							res.redirect('/user/'+ req.session.login2)
						}
					})
				})
			})
			})
		} else {
			req.session.error = 'You must first complete your profile';
			res.redirect('/profile');
		}
	} else {
		req.session.error = 'Please sign in';
		res.redirect('/');
	}
});

module.exports = router;
