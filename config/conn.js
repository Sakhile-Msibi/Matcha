var mysql = require('mysql');

var conn = mysql.createConnection({
	host	 : 'localhost',
	port	 : 3306,
	user	 : 'root',
	database : 'matcha',
	password : ''
});

conn.connect(function(error){
    if (!!error)
        console.log(error);
    else
        console.log('Database Connected');

    });


module.exports = conn;
