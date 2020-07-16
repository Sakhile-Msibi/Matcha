//connection

var mysql      = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	port	 : 3306,
	user     : 'root',
	password : 'Sakhile198'
});

//Catching errors

connection.connect(function(err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	} else {
		console.log('connected');
		return;
	}
});

//Db creation

connection.query('CREATE DATABASE IF NOT EXISTS matcha');

console.log('Database matcha Created !');

//Choosing db

connection.query('USE matcha');

console.log('Database changed !');

//Filling database

//		USERS
connection.query('CREATE TABLE IF NOT EXISTS user ('
	+ 'id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,'
	+ 'signin VARCHAR(100) NOT NULL, name VARCHAR(100) NOT NULL,'
	+ 'surname VARCHAR(100) NOT NULL,'
	+ 'email VARCHAR(255) NOT NULL, passwd VARCHAR(255) NOT NULL,'
	+ 'register DATETIME,'
	+ 'age INT(3),'
	+ 'gender VARCHAR(25),'
	+ 'city VARCHAR(255),'
	+' description VARCHAR(10000),'
	+ 'interest VARCHAR(255),'
	+' profilePic VARCHAR(255),'
	+ 'photo1 VARCHAR(255),'
	+ 'photo2 VARCHAR(255),'
	+ 'photo3 VARCHAR(255),'
	+ 'photo4 VARCHAR(255),'
	+ 'online BOOLEAN DEFAULT FALSE,'
	+ 'latitude FLOAT,'
	+ 'longitude FLOAT,'
	+ 'hash VARCHAR(255),'
	+ 'connect DATETIME,'
	+ 'token VARCHAR(255),'
	+ 'verified TINYINT(4))', function(err) {
	if (err) throw err;
	else {
		console.log('Table user created !');
	}
});

//		TAGS
connection.query('CREATE TABLE IF NOT EXISTS tag ('
	+ 'id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,'
	+ 'signin VARCHAR(100) NOT NULL,'
	+ 'tag VARCHAR(16))', function(err) {
	if (err) throw err;
	else {
		console.log('Table tag created');
	}
});

//		POPULARITY
connection.query('CREATE TABLE IF NOT EXISTS popularity ('
	+ 'id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,'
	+ 'signin VARCHAR(100) NOT NULL,'
	+ 'popular INT(6) NOT NULL)', function(err) {
	if (err) throw err;
	else {
		console.log('Table popularity created !');
	}
});

//		LIKE
connection.query('CREATE TABLE IF NOT EXISTS liked ('
	+ 'id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,'
	+ 'signin VARCHAR(100) NOT NULL,'
	+ 'liked VARCHAR(100) NOT NULL)', function(err) {
	if (err) throw err;
	else {
		console.log('Table like created !');
	}
});

//		MATCHED
connection.query('CREATE TABLE IF NOT EXISTS matched ('
	+ 'id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,'
	+ 'signin VARCHAR(100) NOT NULL,'
	+ 'matched VARCHAR(100) NOT NULL)', function(err) {
	if (err) throw err;
	else {
		console.log('Table match created !');
	}
})

//		NOTIFICATIONS
connection.query('CREATE TABLE IF NOT EXISTS notice ('
	+ 'id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,'
	+ 'signin VARCHAR(100) NOT NULL,'
	+ 'sendDate DATETIME,'
	+ 'type VARCHAR(20),'
	+ 'msg VARCHAR(50),'
	+ 'readed INT(1))', function(err) {
	if (err) throw err;
	else {
		console.log('Table notice created !');
	}
})

//		MESSAGES
connection.query('CREATE TABLE IF NOT EXISTS message ('
	+ 'id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,'
	+ 'signin VARCHAR(100) NOT NULL,'
	+ 'sendDate DATETIME,'
	+ 'user VARCHAR(100) NOT NULL,'
	+ 'message VARCHAR(160) NOT NULL)', function(err) {
	if (err) throw err;
	else {
		console.log('Table message created !');
	}
})

//		BLOCK
connection.query('CREATE TABLE IF NOT EXISTS blocked ('
	+ 'id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,'
	+ 'signin VARCHAR(100) NOT NULL,'
	+ 'user VARCHAR(100) NOT NULL)', function(err) {
	if (err) throw err;
	else {
		console.log('Table message created !');
	}
})

//FILL TABLE USER :
/*
* Sakhile
*/
connection.query('INSERT INTO user SET signin = "Sakhile", name = "Sakhile", surname = "Msibi", email = "thembinkosimsibi198@gmail.com", passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "30", gender = "male", city = "Johannesburg", description = "Man is not hot", interest = "female", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = "1"');
connection.query('INSERT INTO tag SET signin = "Sakhile", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Sakhile", tag = "soccer"');
connection.query('INSERT INTO tag SET signin = "Sakhile", tag = "coding"');
connection.query('INSERT INTO tag SET signin = "Sakhile", tag = "reading"');
console.log('User Sakhile created !');

/*
* POPULARITY
*/
connection.query('INSERT INTO popularity SET signin = "Sakhile", popular = 120')
console.log("table popularity filled")

//End of connection
connection.end();
