const express = require('express');
const router = express.Router();

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
        req.redirect('/home');
    } else {
        res.render('index', { title: 'matcha' });
    }
});
// exports.index = function(req, res){
//     var message = '';
//   res.render('index',{message: message})};
module.exports = router;