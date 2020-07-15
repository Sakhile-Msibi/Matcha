let mysql = require('mysql');

let connexion = mysql.createConnection({
	host	 : 'localhost',
	port	 : 3306,
	user	 : 'root',
	database : 'matcha',
	password : 'Sakhile198'
});

connexion.connect();

module.exports = connexion;
