const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    name: 'db_matcha',
    user: 'root',
    password: 'Sakhile198'
});

conn.connect(function(error){
    if (!!error)
        console.log(error);
    else
        console.log('Database Connected');

    });

module.exports = conn;