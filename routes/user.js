var express = require('express'),
	connect = require('../config/conn.js'),
	session = require('express-session'),
	router = express.Router()

var views
router.get('/:id', function(req, res, next) {
	if (req.session && req.session.signin) {
		if (req.params.id) {
			var signin = req.params.id
			if (signin) {
				connect.query("SELECT * from blocked WHERE signin = ? AND user = ?", [signin, req.session.signin], (err, rows, result) => {
					if (err) console.log(err)
					if (rows[0] == undefined) {
					connect.query("SELECT * from user WHERE signin = ?", [signin], (err, rows, result) => {
					if (err) console.log(err)
					if (rows) {
						connect.query("SELECT * from tag WHERE signin = ?", [signin], (err1, rows1, result1) => {
							if (err1) console.log(err1)
							var UserTag = rows1
							var name = rows[0].name,
								surname = rows[0].surname,
								gender = rows[0].gender,
								interest = rows[0].interest,
								age = rows[0].age,
								mainpic1 = rows[0].profilePic,
								online = rows[0].online,
								connected = rows[0].connect,
								descri = rows[0].description
							req.session.login2 = req.params.id
							connect.query("SELECT * FROM liked WHERE signin = ? AND liked = ?", [req.session.signin, signin], (err2, rows2, result2) => {
								if (err) console.log(err)
								if (rows2[0] != undefined) {
									res.locals.liked = "ok"
									connect.query("SELECT * FROM liked WHERE signin = ? AND liked = ?", [signin, req.session.signin], (err3, rows3, res3) => {
										if (err) console.log(err)
										if (rows3[0] != undefined) {
											req.session.chat = "ok"
										}
									})
								} else {
									res.locals.liked = undefined
								}
						connect.query("SELECT photo1, photo2, photo3, photo4 FROM user WHERE signin = ?", [signin], (err, rows3, result) => {
							if (err) console.log(err)
							connect.query("SELECT user FROM blocked WHERE signin = ? AND user = ?", [req.session.signin, signin], (err, rows5, result) => {
								if (err) console.log(err)
								if (rows5[0] != undefined) {
									var blocked = "yes"
								} else {
									var blocked = "no"
								}
								connect.query("SELECT popular FROM popularity WHERE signin = ?", [signin], (err, rows, result) => {
									if (err) console.log(err)
									var popular = rows[0].popular
									if (views != signin && signin != req.session.signin) {
										var msg = req.session.signin + ' A visite votre profile'
										connect.query("INSERT INTO notice SET signin = ?, sendDate = ?, type = ?, msg = ?, readed = 0", [signin, new Date(), "views", msg], (err, rows, result) => {
											if (err) console.log(err)
											res.io.to(global.people[signin]).emit('notice')
											views = signin
										})
									}
									res.render('user', { title: 'Express', online: online, UserTag: UserTag, age: age, login2: signin, name: name, surname: surname, gender: gender, interest: interest, mainpic1: mainpic1, descri: descri, mine: req.session.signin, photo1: rows3[0].photo1, photo2: rows3[0].photo2, photo3: rows3[0].photo3, photo4: rows3[0].photo4, blocked: blocked, popular: popular, connected: connected })
								})
								})
							})
							})
						})
					} else {
						req.session.error = 'L\'utilisateur n\'existe pas'
						res.redirect('/profile')
					}
				})
				} else {
					req.session.error = 'Cette personne vous a block'
					res.redirect('/home')
				}
			})
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
})

router.post('/like', function(req, res, next) {
	if (req.session && req.session.signin) {
		if (req.session.ok) {
			connect.query("INSERT INTO liked set liked = ?, signin = ?", [req.session.login2, req.session.signin], (err) => {
				if (err) console.log(err)
				var notiflike = req.session.signin + ' vous a like'
				connect.query("INSERT INTO notice SET signin = ?, sendDate = ?, type = ?, msg = ?, readed = 0", [req.session.login2, new Date(), "like", notiflike], (err) => {
					if (err) console.log(err)
					res.io.to(global.people[req.session.login2]).emit('notice')
				connect.query("UPDATE popularity SET popular = popular + 5 WHERE signin = ?", [req.session.signin], (err) => {
					if (err) console.log(err)
					connect.query("SELECT * FROM liked WHERE signin = ? AND liked = ?", [req.session.login2, req.session.signin], (err3, rows3, res3) => {
						if (err) console.log(err)
						if (rows3[0] != undefined) {
							connect.query("INSERT INTO matched SET signin = ?, matched = ?", [req.session.signin, req.session.login2], (err) => {
								if (err) console.log(err)
								connect.query("INSERT INTO matched SET signin = ?, matched = ?", [req.session.login2, req.session.signin], (err) => {
									if (err) console.log(err)
									connect.query("UPDATE popularity SET popular = popular + 15 WHERE signin = ?", [req.session.signin], (err) => {
										if (err) console.log(err)
									var notifmatch = 'Vous avez match avec ' + req.session.login2
									var notif2match = 'Vous avez match avec ' + req.session.signin
									connect.query("INSERT INTO notice SET signin = ?, sendDate = ?, type = ?, msg = ?, readed = 0", [req.session.signin, new Date(), "match", notifmatch], (err) => {
									res.io.to(global.people[req.session.signin]).emit('notice')
										if (err) console.log(err)
									connect.query("INSERT INTO notice SET signin = ?, sendDate = ?, type = ?, msg = ?, readed = 0", [req.session.login2, new Date(), "match", notif2match], (err) => {
										if (err) console.log(err)
										res.io.to(global.people[req.session.login2]).emit('notice')
										req.session.success = 'Vous avez like ' + req.session.login2
										req.session.success = 'Vous avez match avec ' + req.session.login2
										req.session.info = 'Vous pouvez maintenant parler avec ' + req.session.login2
										req.session.chat = "ok"
										res.redirect('/user/'+ req.session.login2)
									})
									})
								})
							})
							})
						} else {
								req.session.success = 'Vous avez like ' + req.session.login2
								res.redirect('/user/'+ req.session.login2)
						}
					})
				})
				})
			})
		} else {
			req.session.error = 'Vous devez completer votre profile pour faire quoi que ce soit d\'autre'
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
			connect.query('DELETE FROM liked WHERE liked = ? AND signin = ?', [req.session.login2, req.session.signin], (err) => {
				if (err) console.log(err)
				var notifunlike = req.session.signin + ' vous a unlike'
			connect.query("INSERT INTO notice SET signin = ?, sendDate = ?, type = ?, msg = ?, readed = 0", [req.session.login2, new Date(), "unlike", notifunlike], (err) => {
				if (err) console.log(err)
				res.io.to(global.people[req.session.login2]).emit('notice')
				connect.query("UPDATE popularity SET popular = popular - 5 WHERE signin = ?", [req.session.signin], (err) => {
					if (err) console.log(err)
					res.locals.liked = undefined
					connect.query("SELECT * FROM matched WHERE signin = ? AND matched = ?", [req.session.signin, req.session.login2], (err, rows, result) => {
						if (err) console.log(err)
						if (rows[0] != undefined) {
							connect.query("DELETE FROM matched WHERE signin = ? AND matched = ?", [req.session.signin, req.session.login2], (err) => {
								if (err) console.log(err)
								connect.query("DELETE FROM matched WHERE signin = ? AND matched = ?", [req.session.login2, req.session.signin], (err) => {
									if (err) console.log(err)
									var notifunmatch = 'Vous avez unmatch avec ' + req.session.login2
									var notifunmatch2 = 'Vous avez unmatch avec ' + req.session.signin
									connect.query("INSERT INTO notice SET signin = ?, sendDate = ?, type = ?, msg = ?, readed = 0", [req.session.signin, new Date(), "unmatch", notifunmatch], (err) => {
										if (err) console.log(err)
										res.io.to(global.people[req.session.signin]).emit('notice')
										connect.query("INSERT INTO notice SET signin = ?, sendDate = ?, type = ?, msg = ?, readed = 0", [req.session.login2, new Date(), "unmatch", notifunmatch2], (err) => {
											res.io.to(global.people[req.session.login2]).emit('notice')
											if (err) console.log(err)
											req.session.success = 'Vous avez unlike ' + req.session.login2
											req.session.success = 'Vous avez unmatch ' + req.session.login2
											res.redirect('/user/'+ req.session.login2)
										})
									})
								})
							})
						} else {
							req.session.success = 'Vous avez unlike ' + req.session.login2
							res.redirect('/user/'+ req.session.login2)
						}
					})
				})
			})
			})
		} else {
			req.session.error = 'Vous devez completer votre profile pour faire quoi que ce soit d\'autre'
			res.redirect('/profile')
		}
	} else {
		req.session.error = 'Please sign in';
		res.redirect('/')
	}
})

module.exports = router
