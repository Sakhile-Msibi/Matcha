var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session && req.session.signin) {
		req.session.error = 'Access denied';
		res.redirect('/home')
	} else {
  		res.render('index', { title: 'Express' })
	}
});

module.exports = router;
