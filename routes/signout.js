var express = require('express');
var router = express.Router();
var session = require('express-session');
var connection = require('../config/conn.js');

router.get('/', function(req, res) {
	if (req.session && req.session.signin) {
		connection.query("UPDATE user SET online = 0 WHERE signin = ?", [req.session.signin], (err) => {
			if (err)
				console.log(err);
		})
	}
	req.session.destroy();
	res.redirect('/');
})

module.exports = router;
