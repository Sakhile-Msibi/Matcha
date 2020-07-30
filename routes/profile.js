var conn = require('../config/conn.js');
var express = require('express');
var session = require('express-session');
var fileUpload = require('express-fileupload');
var bcryptjs = require('bcryptjs');
var router = express.Router();
const regexMail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\")){3,40}@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,6})$/i;

router.use(fileUpload())

router.get('/', function(req, res, next) {
	if (req.session && req.session.signin) {
		conn.query("SELECT * FROM user WHERE signin = ?", [req.session.signin], (err, rows, result) => {
			if (err) console.log(err)
			conn.query("SELECT * FROM tag WHERE signin = ?", [req.session.signin], (err1, rows1, result1) => {
				if (err1) console.log(err1)
				if (rows[0].description)
					if (rows[0].profilePic)
						if (rows1) {
							conn.query("UPDATE popularity SET popular = popular + 5 WHERE signin = ?", [req.session.signin], (err) => {
								if (err) console.log(err)
								req.session.ok = true
								req.session.profilePic = rows[0].profilePic
					})
				}
			})
		})
		conn.query("SELECT tag FROM tag WHERE signin = ?", [req.session.signin], (err, rows, result) => {
			if (err) console.log(err)
			res.locals.tag = rows
			conn.query("SELECT description FROM user WHERE signin = ?", [req.session.signin], (err, rows1, result) => {
				if (err) console.log(err)
				conn.query("SELECT profilePic FROM user WHERE signin = ?", [req.session.signin], (err, rows2, result) => {
					if (err) console.log(err)
					conn.query("SELECT photo1, photo2, photo3, photo4 FROM user WHERE signin = ?", [req.session.signin], (err, rows3, result) => {
					if (rows2)
						res.render('profile', { descri: rows1[0].description, profilePic: rows2[0].profilePic, photo1: rows3[0].photo1, photo2: rows3[0].photo2, photo3: rows3[0].photo3, photo4: rows3[0].photo4})
					else
						res.render('profile', { descri: rows1[0].description})
				})
				})
			})
		})
	} else {
		req.session.error = 'Please sign in';
		res.redirect('/')
	}
})

router.post('/', function(req, res, next) {
	if (req.session && req.session.signin) {
		var tag = req.body.tag	
		if (tag) {
			if (tag.length > 15) {
				req.session.error = 'The tag must be at least 14 characters';
				res.redirect('/profile');
			} else {
					conn.query("INSERT INTO tag SET signin = ?, tag = ?", [req.session.signin, tag], (err) => {
					if (err) console.log(err)
					req.session.success = 'The tag has been added in your profile';
					req.session.info = 'You can add unlimited tags!';
					res.redirect('/profile');
				})
			} 	
		} else {
			req.session.error = 'The field is empty';
			res.redirect('/profile')
		}
	} else {
		req.session.error = 'Please sign in';
		res.redirect('/')
	}
});

router.post('/des', function(req, res, next) {
	RegexMore = /[a-zA-Z\,\.]/
	if (req.session && req.session.signin) {
		var descri = req.body.descri
		if (descri) {
			if (descri.length < 10) {
				req.session.error = 'The description is too short';
				res.redirect('/profile');
			} else if (descri.length > 200) {
				req.session.error = 'The description must be less tha 200 characters';
				res.redirect('/profile');
			} else if (descri.search(RegexMore) == -1) {
				req.session.error = 'The description can not include special characters, except a comma an a full-stop';
				res.redirect('/profile');
			} else {
				conn.query("UPDATE user SET description = ? WHERE signin = ?", [descri, req.session.signin], (err) => {
					if (err) console.log(err)
					res.locals.descri = descri
					req.session.success = 'The description has been added to your profile';
					res.redirect('/profile');
				})
			}
		} else {
			req.session.error = 'The field is empty';
			res.redirect('/profile')
		}
	} else {
		req.session.error = 'Please sign in';
		res.redirect('/')
	}
})

router.post('/upload/:id', function(req, res, next) {
	if (req.session && req.session.signin) {
		if (req.params.id == 1 || req.params.id == 2 || req.params.id == 3 || req.params.id == 4 || req.params.id == 5) {
			if (!req.files) {
				req.session.error = 'No image is uploaded in your profile';
				res.redirect('/profile');
			} else {
				var file = req.files.uploaded_image
				var img_name = file.name

				if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png") {
					file.mv('public/images/upload_images/'+file.name, function(err) {
						if (err) {
							req.session.error = 'An error has occured';
							res.redirect('/profile')
						}
						if (req.params.id == 1) {
							conn.query("UPDATE user SET profilePic = ? WHERE signin = ?", [img_name, req.session.signin], (err) => {
								if (err) console.log(err)
								req.session.success = "A photo has been uploaded in your profile ";
								res.redirect('/profile')
							})
						} else if (req.params.id == 2) {
							conn.query("UPDATE user SET photo1 = ? WHERE signin = ?", [img_name, req.session.signin], (err) => {
								if (err) console.log(err)
								req.session.success = "A photo has been uploaded in your profile ";
								res.redirect('/profile')
							})
						} else if (req.params.id == 3) {
							conn.query("UPDATE user SET photo2 = ? WHERE signin = ?", [img_name, req.session.signin], (err) => {
								if (err) console.log(err)
								req.session.success = "A photo has been uploaded in your profile ";
								res.redirect('/profile')
							})
						} else if (req.params.id == 4) {
							conn.query("UPDATE user SET photo3 = ? WHERE signin = ?", [img_name, req.session.signin], (err) => {
								if (err) console.log(err)
								req.session.success = "A photo has been uploaded in your profile ";
								res.redirect('/profile')
							})
						} else if (req.params.id == 5) {
							conn.query("UPDATE user SET photo4 = ? WHERE signin = ?", [img_name, req.session.signin], (err) => {
								if (err) console.log(err)
								req.session.success = "A photo has been uploaded in your profile ";
								res.redirect('/profile')
							})
						} else {
							req.session.error = 'An error has occurred';
							res.redirect('/profile');
						}
					})
				} else {
					req.session.error = 'The photo format is not allowed';
					req.session.info = "The application only allows the following formats: .png, .jpg";
					res.redirect('/profile');
				}
			}
		} else {
			req.session.error = 'An error has occurred';
			res.redirect('/profile');
		}
	} else {
		req.session.error = 'Please sign in';
		res.redirect('/')
	}
})

router.post('/base', function(req, res, next) {
	if (req.session && req.session.signin) {
		var name = req.body.name;
		var signin = req.body.signin;
		var pswd = req.body.pswd;
		var	hash = bcryptjs.hashSync(pswd, 10);
		var	surname = req.body.surname;
		var email = req.body.email;
		var city = req.body.city;
		var sexual_preference = req.body.sexual_preference;
		var	RegexBoth = /[a-zA-Z]/;
		var regexSmall = /[a-z]/;
		var	regexCapital = /[A-Z]/;
		var	regexSC = /[a-zA-Z]/;
		var	regexAlphanumeric = /[a-zA-Z0-9]/;
		var	regexchar = /[a-zA-Z-0-9\#\$\%\^\&\*\,\.]/;
		if (name) {
			if (name.search(RegexBoth)) {
				req.session.error = 'The name must only contain alphabets';
				res.redirect('/profile');
			} else if (name.length > 18) {
				req.session.error = 'The name must be less than 18 characters';
				res.redirect('/profile');
			} else {
				conn.query('UPDATE user SET name = ? where signin = ?', [name, req.session.signin], (err) => {
					if (err) console.log(err)
					req.session.name = name
					req.session.success = 'Your name has been changed';
					res.redirect('/profile');
				})
			}
		}
		if (surname) {
			if (surname.search(RegexBoth)) {
				req.session.error = 'The surname must only contain alphabets';
				res.redirect('/profile');
			} else if (surname.length > 18) {
				req.session.error = 'The surname must be less than 18 characters';
				res.redirect('/profile');
			} else {
				conn.query('UPDATE user SET surname = ? where signin = ?', [surname, req.session.signin], (err) => {
					if (err) console.log(err)
					req.session.surname = surname
					req.session.success = 'Your surname has been changed';
					res.redirect('/profile');
				})
			}
		}
		if (signin) {
			if (signin.search(RegexBoth)) {
				req.session.error = 'The username must only contain alphabets';
				res.redirect('/profile');
			} else if (surname.length > 18) {
				req.session.error = 'The username must be less than 18 characters';
				res.redirect('/profile');
			} else {
				conn.query('UPDATE user SET signin = ? where signin = ?', [signin, req.session.signin], (err) => {
					if (err) console.log(err)
					req.session.signin = signin
					req.session.success = 'Your username has been changed';
					res.redirect('/profile');
				})
			}
		}
		if (pswd) {
			if (pswd.search(RegexBoth)) {
				req.session.error = 'The password must only contain alphabets';
				res.redirect('/profile');
			} else if (pswd.length > 8) {
				req.session.error = 'The password must be less than 8 characters';
				res.redirect('/profile');
			} else if (pswd.regexAlphanumeric) {
				req.session.error = 'The password must contain lettrs and number';
				res.redirect('/profile');
			
			} else {
				conn.query('UPDATE user SET passwd = ? where signin = ?', [hash, req.session.signin], (err) => {
					if (err) console.log(err)
					req.session.pswd = hash;
					req.session.success = 'Your surname has been changed';
					res.redirect('/profile');
				})
			}
		}
		if (email) {
			 if (!regexMail.test(email)) {
	    		req.session.error = 'Invalid email!';
		    	res.redirect('/profile');
			} else {
				conn.query('UPDATE user SET email = ? where signin = ?', [email, req.session.signin], (err) => {
					if (err) console.log(err)
					req.session.email = email
					req.session.success = 'Your email has been changed';
					res.redirect('/profile');
				})
			}
		}
		if (city) {
			if (city.search(RegexBoth)) {
				req.session.error = 'The city must only contain alphabets';
				res.redirect('/profile');
			// } else if (name.length < 1) {
			// 	req.session.error = 'The city must contain more than one characters';
			// 	res.redirect('/profile');
			} else {
				conn.query('UPDATE user SET city = ? where signin = ?', [city, req.session.signin], (err) => {
					if (err) console.log(err)
					req.session.city = city
					req.session.success = 'Your city has been changed';
					res.redirect('/profile');
				})
			}
		}
		if (sexual_preference) {
			//if (sexual_preference.search(RegexBoth)) {
			//	req.session.error = 'The sexual preference must only contain alphabets';
			//	res.redirect('/profile');
			// } else if (name.length < 1) {
			// 	req.session.error = 'The sexual preference must contain more than one characters';
			// 	res.redirect('/profile');
			//} else {
			conn.query('UPDATE user SET sexual_preference = ? where signin = ?', [sexual_preference, req.session.signin], (err) => {
				if (err) console.log(err)
				req.session.sexual_preference = sexual_preference
				req.session.success = 'Your sexual preference has been changed';
				res.redirect('/profile');
			})
		//	}
		}
	} else {
		req.session.error = 'Please sign in';
		res.redirect('/');
	}
});

module.exports = router;