const conn = require('../config/database.js');
const express = require('express');
const session = require('express-session');
const flash = require('req-flash');
const router = express.Router();

router.get('/', function(req, res, next) {
	if (req.session && req.session.signin) {
		if (req.session.ok) {
			conn.query("SELECT signin FROM blocked_user WHERE user = ?", [req.session.signin], (err, rows0, result) => {
                if (err)
                    console.log(err);
				if (rows0[0] != undefined) {
					const skip = rows0[0].signin;
                    if (rows0[1] != undefined)
                        var skip1 = rows0[1].signin;
					else
						var skip1 = "no";
					if (rows0[2] != undefined)
						var skip2 = rows0[2].signin;
					else
						var skip2 = "no";
				} else {
					const skip = "no";
					const skip1 = "no";
					const skip2 = "no";
				}
    			const signin = req.session.signin;
	    		const gender = req.session.gender;
		    	const age = req.session.age;
			    const interest = req.session.interest;
    			const description = req.session.description;
	    		const city = req.session.city;
		    	conn.query("SELECT * from user WHERE signin != ?", [signin], (error, column, results) => {
                    if (error)
                        console.log(error);
    				if (column.length != 0) {
	    				if (interest == "female" && gender == "male") {
                            conn.query("SELECT signin, name, surname, gender, age, interest, description, main_picture FROM user" +
                                "WHERE gender = ? AND city = ? AND signin != ? AND main_picture IS NOT NULL AND (interest = ? OR interest = ?)",
                                ["female", city, signin, "male", "both"], (err, rows, result) => {
                                if (err)
                                    console.log(err);
							    const profile = rows;
    							res.render('home', { title: 'matcha', profile: profile, skip: skip, skip1: skip1, skip2: skip2})
	    					});
		    			} else if (interest == "male" && gender == "female") {
                            conn.query("SELECT signin, name, surname, gender, age, interest, description, main_picture FROM user" +
                                "WHERE gender = ? AND city = ? AND signin != ? AND main_picture IS NOT NULL AND (interest = ? OR interest = ?)",
                                ["male", city, signin, "female", "both"], (err, rows, result) => {
                                if (err)
                                    console.log(err);
    							const profile = rows;
	    						res.render('home', { title: 'matcha', profile: profile, skip: skip, skip1: skip1, skip2: skip2})
		    				});
			    		} else if (interest == "both" && gender == "male") {
                            conn.query("SELECT signin, name, surname, gender, age, interest, description, main_picture FROM user" +
                                "WHERE (gender = ? OR gender = ?) AND city = ? AND signin != ? AND main_picture IS NOT NULL AND interest = ?",
                                ["male", "female", city, signin, "male"], (err, rows, result) => {
                                if (err)
                                    console.log(err);
					    		const profile = rows;
						    	res.render('home', { title: 'matcha', profile: profile, skip: skip, skip1: skip1, skip2: skip2})
    						});
    					} else if (interest == "both" && gender == "female") {
                            conn.query("SELECT signin, name, surname, gender, age, interest, description, main_picture FROM user" +
                                "WHERE city = ? AND signin != ? AND main_picture IS NOT NULL AND interest = ?",
                                [city, signin, "female"], (err, rows, result) => {
                                if (err)
                                    console.log(err);
						    	const profile = rows;
							    res.render('home', { title: 'matcha', profile: profile, skip: skip, skip1: skip1, skip2: skip2})
    						});
	    				} else {
                            conn.query("SELECT signin, name, surname, gender, age, interest, description, main_picture FROM user" +
                                "WHERE city = ? AND signin != ? AND main_picture IS NOT NULL", [city, signin], (err, rows, result) => {
                                if (err)
                                    console.log(err);
						    	const profile = rows;
							    res.render('home', { title: 'matcha', profile: profile, skip: skip, skip1: skip1, skip2: skip2})
    						});
    					}
	    			} else {
		    			const profile = undefined;
			    		res.render('home', { title: 'matcha', profile: profile})
				    }
    			});
			});
		} else {
			req.session.error = 'Complete your profile in order to proceed to this page';
			res.redirect('/profile');
		}
	} else {
		req.session.error = 'Please sign in';
		res.redirect('/');
	}
});

router.get('/tag', function(req, res, next) {
	if (req.session && req.session.signin) {
		const arr = [];
		conn.query("SELECT tag FROM tag WHERE signin = ?", [req.session.signin], (err, rows, result) => {
            if (err)
                console.log(err);
			if (rows[0] != undefined) {
				const i = 0;
				const k = 0;
				while (rows[i]) {
					conn.query("SELECT signin from tag WHERE signin != ? AND tag = ?", [req.session.signin, rows[i].tag], (err1, rows1, result1) => {
                        if (err)
                            console.log(err);
						if (rows1.length != 0) {
							for (const j=0;rows1[j];j++) {
								arr[k] = rows1[j].signin;
								k++;
							}
						}
					});
					i++;
				}
			}
			res.redirect('/home');
		});
	} else {
		req.session.error = 'Please sign in';
		res.redirect('/');
	}
})

router.get('/popular', function(req, res, next) {
	if (req.session && req.session.login) {
		conn.query("SELECT signin FROM blocked_user WHERE user = ?", [req.session.signin], (err, rows0, result) => {
            if (err)
                console.log(err)
			if (rows0[0] != undefined) {
				var skip = rows0[0].signin;
				if (rows0[1] != undefined)
					var skip1 = rows0[1].signin;
				else
					var skip1 = "no";
				if (rows0[2] != undefined)
					var skip2 = rows0[2].signin;
				else
					var skip2 = "no";
			} else {
				var skip = "no";
				var skip1 = "no";
				var skip2 = "no";
			}
            conn.query("SELECT u.signin, u.name, u.surname, u.gender, u.age, u.interest, u.description, u.main_picture FROM user u" +
                "INNER JOIN popularity p ON u.signin = p.signin WHERE u.city = ? AND u.signin != ? AND u.main_picture IS NOT NULL AND" +
                "gender = ? AND (INTEREST = ? OR INTEREST = ?) ORDER BY p.popular DESC",
                [req.session.city, req.session.signin, req.session.interest, req.session.gender, "both"], (err, rows, result) => {
				if (rows[0] != undefined) {
					const profile = rows;
					res.render('home', { title: 'matcha', profile: profile, skip: skip, skip1: skip1, skip2: skip2 })
				} else {
					const profile = undefined;
					res.redirect('/home');
				}
			});
		});
	} else {
		req.session.error = 'Please sign in';
		res.redirect('/');
	}
});


router.get('/age', function(req, res, next) {
	if (req.session && req.session.login) {
		conn.query("SELECT signin FROM blocked_user WHERE user = ?", [req.session.signin], (err, rows0, result) => {
            if (err)
                console.log(err);
			if (rows0[0] != undefined) {
				var skip = rows0[0].signin;
				if (rows0[1] != undefined)
					var skip1 = rows0[1].signin;
				else
					var skip1 = "no";
				if (rows0[2] != undefined)
					var skip2 = rows0[2].signin;
				else
					var skip2 = "no";
			} else {
				var skip = "no";
				var skip1 = "no";
				var skip2 = "no";
			}
            conn.query("SELECT signin, name, surname, gender, age, interest, description, main_picture FROM user" +
                "WHERE city = ? AND signin != ? AND main_picture IS NOT NULL AND gender = ? AND (INTEREST = ? OR INTEREST = ?) ORDER BY age DESC",
                [req.session.city, req.session.signin, req.session.interest, req.session.gender, "both"], (err, rows, result) => {
				if (rows[0] != undefined) {
					const profile = rows;
					res.render('home', { title: 'matcha', profile: profile, skip: skip, skip1: skip1, skip2: skip2 })
				} else {
					const profile = undefined;
					res.redirect('/home');
				}
			});
		});
	} else {
		req.session.error = 'Please sign in';
		res.redirect('/');
	}
});

module.exports = router;
