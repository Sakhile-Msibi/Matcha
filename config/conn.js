var mysql = require('mysql');

var conn = mysql.createConnection({
	host	 : 'localhost',
<<<<<<< HEAD
	port	 : 8080,
=======
	port	 : 3306,
>>>>>>> 24fde18b2ec5a30375acf21a9993b93d4bb66971
	user	 : 'root',
	database : 'matcha',
	password : 'Sakhile198'
});

conn.connect(function(error){
    if (!!error)
        console.log(error);
    else
        console.log('Database Connected');

    });


module.exports = conn;
