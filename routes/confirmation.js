const conn = require('../config/conn.js');
const express = require('express');
const loginchecker = require('./loginchecker.js');
const router = express.Router();

router.get('/:id', loginchecker.redirectDashboard, (req, res) =>{
    let token = req.params.id;

    let sql = `UPDATE user SET verified = 1 WHERE token = '${token}' LIMIT 1`;
    conn.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        console.log(result.affectedRows + " record(s) updated");
        return res.redirect('/signin');
    });
});

module.exports = router;