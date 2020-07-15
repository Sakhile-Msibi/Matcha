<<<<<<< HEAD
var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session && req.session.login) {
		req.session.error = "Vous ne pouvez plus aller sur cette page"
		res.redirect('/home')
	} else {
  		res.render('index', { title: 'Express' })
	}
})

module.exports = router
=======
var express = require('express');
var router = express.Router();

// router.get('/', (req, res) => {
//    // res.send = 'Hello World!'
//    res.render('index');
// });
/*
* GET home page.
*/
router.get('/', function(req, res, next) {
	if (req.session && req.session.signin) {
		req.session.error = 'Access denied';
		res.redirect('/home');
	} else {
  		res.render('index', { title: 'Express' })
	}
});

module.exports = router;
>>>>>>> 24fde18b2ec5a30375acf21a9993b93d4bb66971
