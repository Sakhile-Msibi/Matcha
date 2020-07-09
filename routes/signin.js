const conn = require('../config/database.js');
const express = require('express');
const session = require('express-session');
const bcryptjs = require('bcryptjs');
const flash = require('req-flash');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('signin', { title: 'matcha' });
});

router.post('/', function(req, res) {
	if (req.session && req.session.signin) {
		req.session.error = "Access denied";
        res.redirect('/home');
	} else {
        const signin = req.body.signin;
		const password = req.body.password;
	    const regexSmall = /[a-z]/;
		const regexCapital = /[A-Z]/;
		const regexCharacters = /[a-zA-Z-0-9\#\$\%\^\&\*\,\.]/;
	    if (signin && password) {
		    conn.query("SELECT * FROM user WHERE signin = ? LIMIT 1", [signin], (err, rows, result) => {
			    if (err) {
				    req.session.error = 'The username or password is incorrect';
				    res.redirect('/signin');
			    } else if (!password.search(/\d/)) {
				    req.session.error = 'The password must contain at least one number';
				    res.redirect('/signin');
			    } else if (password.search(regexSmall) == -1) {
				    req.session.error = 'The password must have at least one lower case alphabet';
				    res.redirect('/signin');
			    } else if (password.search(regexCapital) == -1) {
				    req.session.error = 'The password must have at least one upper case alphabet';
				    res.redirect('/signin');
			    } else if (password.search(regexCharacters) == -1) {
				    req.session.error = 'The password can only have these characters #, $, %, ^, &, *, ,, and . ';
	    			res.redirect('/signin');
		    	} else if (password.length < 6) {
			    	req.session.error = 'The password must have a minimum of 6 characters';
				    res.redirect('/signin');
    			} else if (password.length > 15) {
	    			req.session.error = 'The password must have a maximum of 15 characters';
		    		res.redirect('/signin');
			    } else if (rows[0]) {
				    conn.query("UPDATE user SET online = 1 WHERE login = ?", [signin], (err) => {
                        if (err)
                            console.log(err);
    				});
                    if (bcryptjs.compareSync(password, rows[0].passcode)) { 
		    			req.session.signin = signin.toLowerCase();
			    		if (rows[0].main_picture) {
				    		req.session.ok = true;
					    	req.session.orientation = rows[0].orientation;
						    req.session.surname = rows[0].surname;
    						req.session.name = rows[0].name;
	    					req.session.gender = rows[0].gender;
		    				req.session.main_picture = rows[0].main_picture;
			    			req.session.age = rows[0].age;
				    		req.session.interest = rows[0].interest;
					    	req.session.city = rows[0].city;
						    req.session.log = true;
    						conn.query("UPDATE popularity SET popular = popular + 5 WHERE signin = ?", [signin], (err) => {
	    						if (err) console.log(err)
		    				})
			    			connect.query("UPDATE user SET online = 1, connect = ? WHERE signin = ?", [new Date(), signin], (err) => {
                                if (err)
                                    throw (err);
						    });
    						req.session.success = "Welcome to Matcha";
	    					res.redirect('/home');
		    			} else {
			    			req.session.ok = false;
				    		req.session.gender = rows[0].gender;
					    	req.session.surname = rows[0].surname;
						    req.session.name = rows[0].name;
    						req.session.interest = rows[0].interest;
	    					req.session.city = rows[0].city;
		    				req.session.age = rows[0].age;
			    			req.session.info = 'Please fill in your presonal information';
				    		connect.query("UPDATE user SET online = 1, connect = ? WHERE signin = ?", [new Date(), signin], (err) => {
                                if (err)
                                    throw (err);
    						});
	    					req.session.success = "Welcome to Matcha";
		    				req.session.log = true;
			    			res.redirect('/profile');
				    	}
    				} else {
	    				req.session.error = 'The username or password is incorrect';
		    			res.redirect('/signin');
    				}
	    		} else {
		    		req.session.error = 'The username or password is incorrect';
			    	res.redirect('/signin');
    			}
	    	});
    	} else {
	    	req.session.error = 'Please fill in all the rquired details';
		    res.redirect('/signin');
    	}
	}
});

module.exports = router;
