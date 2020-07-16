var express = require('express');
const loginchecker = require('./loginchecker');
var router = express.Router();

// router.get('/', (req, res) => {
//    // res.send = 'Hello World!'
//    res.render('index');
// });
/*
* GET home page.
*/
router.get('/', loginchecker.redirectDashboard,function(req, res, next) {
	if (req.session && req.session.signin) {
		req.session.error = 'Access denied';
		res.redirect('/home');
	} else {
  		res.render('index', { title: 'Express' })
	}
});

module.exports = router;
