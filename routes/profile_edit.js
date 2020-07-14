var conn = require('../config/conn.js');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('/profile', { title: 'Express' })
})


router.get('/tag/:tag', function(req, res) {
	if (req.session && req.session.signin) {
		var tag = req.params.tag
		if (tag) {
			conn.query("SELECT tag from tag WHERE signin = ? AND tag = ?", [req.session.signin, tag], (err, rows, result) => {
				if (err) console.log(err)
				if (rows[0].tag) {
					conn.query("DELETE from tag WHERE tag = ? AND signin = ?", [tag, req.session.signin], (err) => {
						if (err) console.log(err)
						req.session.success = 'The tag has been deleted from your profile';
						res.redirect('/profile')
					});
				}
			});
		}
	} else {
		req.session.error = 'Please sign in';
		res.redirect('/')
	}
})

module.exports = router;
