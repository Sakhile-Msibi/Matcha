const express = require('express');
const router = express.Router();
conn = require('../config/conn.js');



router.get('/', /*redirectDashboard,*/ (req, res) =>{
    let token = req.params.id;
    let sql = `UPDATE user SET verified = 1 WHERE token = '${token}'`;
    conn.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
        return res.redirect('/signin');
    });
});

module.exports = router;