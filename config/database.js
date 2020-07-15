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
//
// wickedpool
//
connection.query('INSERT INTO user SET signin = "wickedpool", name = "Thomas", surname = "Giraud", email = "thomasgirauddu73@gmail.com", passwd = "$2a$10$7ZelqP8zbBqsX91wyJ2NuOoDedtiwN5n9I4O6rCdc4gdyZw7oYMli", register = "2017-09-23 20:37:10", age = "19", gender = "male", city = "Paris", description = "Oklm thomas du 73 rpz", interest = "female", profilePic = "medium_thgiraud.jpg", latitude = "48.8965", longitude = "2.3182", hash = "$2a$10$vtRrqaG87MzU8E3KVe9Zyusj9rnttR2DsRAeUlyibncE6aE75BIui", connect = "2017-09-23 20:37:10"');
connection.query('INSERT INTO tag SET signin = "wickedpool", tag = "oklm"');
connection.query('INSERT INTO tag SET signin = "wickedpool", tag = "easy"');
connection.query('INSERT INTO tag SET signin = "wickedpool", tag = "alcool"');
connection.query('INSERT INTO tag SET signin = "wickedpool", tag = "bedo"');
console.log('User wickedpool created !');
//
// glouyot
//
connection.query('INSERT INTO user SET signin = "glouyot", name = "Guillaume", surname = "Louyot", email = "glouyot@gmail.com", passwd = "$2a$10$7ZelqP8zbBqsX91wyJ2NuOoDedtiwN5n9I4O6rCdc4gdyZw7oYMli", register = "2017-09-23 20:37:10", age = "25", gender = "male", city = "Paris", description = "Glouyot 42 rpz la mif", interest = "female", profilePic = "glouyot.jpg", latitude = "48.8965", longitude = "2.3182", hash = "$2a$10$ur8En9Y6Xn2YRpVL/UOy0.8YJqGI6X.m344JvaVInCdPYSOsdWrF.", connect = "2017-09-23 20:37:10"');
connection.query('INSERT INTO tag SET signin = "glouyot", tag = "hey"');
connection.query('INSERT INTO tag SET signin = "glouyot", tag = "lutins"');
connection.query('INSERT INTO tag SET signin = "glouyot", tag = "alcool"');
connection.query('INSERT INTO tag SET signin = "glouyot", tag = "drug"');
console.log('User glouyot created !');
//
// jorobin
//
connection.query('INSERT INTO user SET signin = "jorobin", name = "Josephine", surname = "Robin", email = "jorobin@gmail.com", passwd = "$2a$10$7ZelqP8zbBqsX91wyJ2NuOoDedtiwN5n9I4O6rCdc4gdyZw7oYMli", register = "2017-09-23 20:37:10", age = "21", gender = "female", city = "Paris", description = "Salut moi jsuis oklm", interest = "male", profilePic = "jorobin.jpg", latitude = "48.8965", longitude = "2.3182", hash = "$2a$10$xpT3mtk//0W2cDKC7xUPkuMpg3Gw6c/cwGNP6HGR4hbaNfXJSuZAm", connect = "2017-09-23 20:37:10"');
connection.query('INSERT INTO tag SET signin = "jorobin", tag = "hey"');
connection.query('INSERT INTO tag SET signin = "jorobin", tag = "heyo"');
connection.query('INSERT INTO tag SET signin = "jorobin", tag = "heyi"');
connection.query('INSERT INTO tag SET signin = "jorobin", tag = "heyueu"');
console.log('User jorobin created !');
//
// cuzureau
//
connection.query('INSERT INTO user SET signin = "cuzureau", name = "Christophe", surname = "Uzureau", email = "cuzureau@gmail.com", passwd = "$2a$10$7ZelqP8zbBqsX91wyJ2NuOoDedtiwN5n9I4O6rCdc4gdyZw7oYMli", register = "2017-09-23 20:37:10", age = "27", gender = "male", city = "Paris", description = "Coucoucou moi c cuzureau", interest = "female", profilePic = "cuzureau.jpg", latitude = "48.8965", longitude = "2.3182", hash = "$2a$10$l4AXqA94X/tl2McbMLtp6uRGOAnXag.Ckb6qYYNsNO0hgln6mvMNK", connect = "2017-09-23 20:37:10"');
connection.query('INSERT INTO tag SET signin = "cuzureau", tag = "alcool"');
connection.query('INSERT INTO tag SET signin = "cuzureau", tag = "heyoo"');
connection.query('INSERT INTO tag SET signin = "cuzureau", tag = "cc"');
connection.query('INSERT INTO tag SET signin = "cuzureau", tag = "hey"');
console.log('User cuzureau created !');
//
// mkantzer
//
connection.query('INSERT INTO user SET signin = "mkantzer", name = "Manon", surname = "Kantzer", email = "mkantzer@gmail.com", passwd = "$2a$10$7ZelqP8zbBqsX91wyJ2NuOoDedtiwN5n9I4O6rCdc4gdyZw7oYMli", register = "2017-09-23 20:37:10", age = "21", gender = "female", city = "Paris", description = "Salut moi jsuis oklm", interest = "male", profilePic = "mkantzer.jpg", latitude = "48.8965", longitude = "2.3182", hash = "$2a$10$of7Y6mXCaN7qGmEEaZY/buP3CA9N0FkLBT7PkPn0XoaHRfLBGCpsG", connect = "2017-09-23 20:37:10"');
connection.query('INSERT INTO tag SET signin = "jorobin", tag = "hey"');
connection.query('INSERT INTO tag SET signin = "jorobin", tag = "heyo"');
connection.query('INSERT INTO tag SET signin = "jorobin", tag = "heyi"');
connection.query('INSERT INTO tag SET signin = "jorobin", tag = "heyueu"');
console.log('User mkantzer created !');
//
// arive-de
//
connection.query('INSERT INTO user SET signin = "arive-de", name = "Alix", surname = "Rive-De", email = "arive-de@gmail.com", passwd = "$2a$10$7ZelqP8zbBqsX91wyJ2NuOoDedtiwN5n9I4O6rCdc4gdyZw7oYMli", register = "2017-09-23 20:37:10", age = "24", gender = "female", city = "Paris", description = "Salut moi jsuis alix oklm", interest = "male", profilePic = "medium_arive-de.jpg", latitude = "48.8965", longitude = "2.3182", hash = "$2a$10$AfXF2JY1FpwAzljjZI8j/emvQc4eBrqwhfJb79bmavVrdi5sFAdiG", connect = "2017-09-23 20:37:10"');
connection.query('INSERT INTO tag SET signin = "arive-de", tag = "biit"');
connection.query('INSERT INTO tag SET signin = "arive-de", tag = "oklm"');
connection.query('INSERT INTO tag SET signin = "arive-de", tag = "joy"');
connection.query('INSERT INTO tag SET signin = "arive-de", tag = "happy"');
console.log('User arive-de created !');
//
// cfatrane
//
connection.query('INSERT INTO user SET signin = "cfatrane", name = "Charles Edouard", surname = "Fatrane", email = "cfatrane@gmail.com", passwd = "$2a$10$7ZelqP8zbBqsX91wyJ2NuOoDedtiwN5n9I4O6rCdc4gdyZw7oYMli", register = "2017-09-23 20:37:10", age = "21", gender = "male", city = "Paris", description = "Coucoucou moi c cfatraner en Y", interest = "female", profilePic = "cfatrane.jpg", latitude = "48.8965", longitude = "2.3182", hash = "$2a$10$LKerxHiJg0tDOxZ39RXH3eaUJARYRGu6jHpYPWKSxMkUzk6dlbvI.", connect = "2017-09-23 20:37:10"');
connection.query('INSERT INTO tag SET signin = "cfatrane", tag = "oklm"');
connection.query('INSERT INTO tag SET signin = "cfatrane", tag = "briquets"');
connection.query('INSERT INTO tag SET signin = "cfatrane", tag = "easy"');
connection.query('INSERT INTO tag SET signin = "cfatrane", tag = "bites"');
console.log('User cfatrane created !');
//
// POPULARITY
//
connection.query('INSERT INTO popularity SET signin = "wickedpool", popular = 120')
connection.query('INSERT INTO popularity SET signin = "glouyot", popular = 60')
connection.query('INSERT INTO popularity SET signin = "jorobin", popular = 220')
connection.query('INSERT INTO popularity SET signin = "cuzureau", popular = 90')
connection.query('INSERT INTO popularity SET signin = "mkantzer", popular = 420')
connection.query('INSERT INTO popularity SET signin = "arive-de", popular = 160')
connection.query('INSERT INTO popularity SET signin = "cfatrane", popular = 110')
console.log("table popularity filled")

//End of connection
connection.end();
