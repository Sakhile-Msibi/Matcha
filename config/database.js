//connection

var mysql      = require('mysql');
const faker = require('faker');

var connection = mysql.createConnection({
	host     : 'localhost',
	port	 : 3306,
	user     : 'root',
	password : ''
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
	+ 'sexual_preference VARCHAR(255),'
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
connection.query('INSERT INTO user SET signin = "Sakhile", name = "Sakhile", surname = "Msibi", email = "thembinkosimsibi198@gmail.com", passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "30", gender = "male", city = "Johannesburg", description = "Man is not hot", sexual_preference = "female", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = "1"');
connection.query('INSERT INTO tag SET signin = "Sakhile", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Sakhile", tag = "soccer"');
connection.query('INSERT INTO tag SET signin = "Sakhile", tag = "coding"');
connection.query('INSERT INTO tag SET signin = "Sakhile", tag = "reading"');
console.log('User Sakhile created !');

/*
* Ayanda
*/
var randomemail = faker.internet.email('ayanda');
var randompic = faker.image.people();
connection.query(`INSERT INTO user SET signin = "Ayanda", name = "Ayanda", surname = "Biyela", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "30", gender = "female", city = "Johannesburg", description = "Girl is hot", sexual_preference = "male", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "soccer"');
console.log('User Ayanda created !');

/*
* Sindi
*/
var randomemail = faker.internet.email('Sindi');
connection.query(`INSERT INTO user SET signin = "Sindi", name = "Sindi", surname = "Zwane", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "20", gender = "female", city = "Johannesburg", description = "Girl is hot", sexual_preference = "both", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "soccer"');
console.log('User Sindi created !');

/*
* Gugu
*/
var randomemail = faker.internet.email('Gugu');
connection.query(`INSERT INTO user SET signin = "Gugu", name = "Gugu", surname = "Zwane", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "24", gender = "female", city = "Johannesburg", description = "Girl is hot", sexual_preference = "female", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "soccer"');
console.log('User Gugu created !');

/*
* Thabo
*/
var randomemail = faker.internet.email('Thabo');
connection.query(`INSERT INTO user SET signin = "Thabo", name = "Thabo", surname = "Biyela", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "30", gender = "male", city = "Johannesburg", description = "Man is hot", sexual_preference = "male", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Thabo", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Thabo", tag = "soccer"');
console.log('User Thabo created !');

/*
* Jason
*/
var randomemail = faker.internet.email('Jason');
connection.query(`INSERT INTO user SET signin = "Jason", name = "Jason", surname = "Zwane", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "20", gender = "male", city = "Johannesburg", description = "Man is hot", sexual_preference = "both", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Jason", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Jason", tag = "soccer"');
console.log('User Jason created !');

/*
* Mandla
*/
var randomemail = faker.internet.email('Mandla');
var randomsurname =  faker.name.lastName();
connection.query(`INSERT INTO user SET signin = "Mandla", name = "Mandla", surname = "${randomsurname}", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "24", gender = "male", city = "Johannesburg", description = "Man is hot", sexual_preference = "female", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Mandla", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Madla", tag = "soccer"');
console.log('User Mandla created !');

/*
* Ayanda
*/
var randomemail = faker.internet.email('ayanda');
var randomsurname =  faker.name.lastName();
connection.query(`INSERT INTO user SET signin = "Ayanda", name = "Ayanda", surname = "${randomsurname}", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "30", gender = "female", city = "Durban", description = "Girl is hot", sexual_preference = "male", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "soccer"');
console.log('User Ayanda created !');

/*
* Sindi
*/
var randomemail = faker.internet.email('Sindi');
var randomsurname =  faker.name.lastName();
connection.query(`INSERT INTO user SET signin = "Sindi", name = "Sindi", surname = "${randomsurname}", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "20", gender = "female", city = "Durban", description = "Girl is hot", sexual_preference = "both", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "soccer"');
console.log('User Sindi created !');

/*
* Gugu
*/
var randomemail = faker.internet.email('Gugu');
var randomsurname =  faker.name.lastName();
connection.query(`INSERT INTO user SET signin = "Gugu", name = "Gugu", surname = "${randomsurname}", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "24", gender = "female", city = "Durban", description = "Girl is hot", sexual_preference = "female", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "soccer"');
console.log('User Gugu created !');

/*
* Thabo
*/
var randomemail = faker.internet.email('Thabo');
var randomsurname =  faker.name.lastName();
connection.query(`INSERT INTO user SET signin = "Thabo", name = "Thabo", surname = "${randomsurname}", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "30", gender = "male", city = "Durban", description = "Man is hot", sexual_preference = "male", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "soccer"');
console.log('User Ayanda created !');

/*
* Jason
*/
var randomemail = faker.internet.email('Sindi');
var randomsurname =  faker.name.lastName();
connection.query(`INSERT INTO user SET signin = "Jason", name = "Jason", surname = "${randomsurname}", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "20", gender = "male", city = "Durban", description = "Man is hot", sexual_preference = "both", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "soccer"');
console.log('User Sindi created !');

/*
* Mandla
*/
var randomemail = faker.internet.email('Mandla');
connection.query(`INSERT INTO user SET signin = "Mandla", name = "Mandla", surname = "${randomsurname}", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "24", gender = "male", city = "Durban", description = "Man is hot", sexual_preference = "female", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "soccer"');
console.log('User Mandla created !');


/*
* Ayanda
*/
var randomemail = faker.internet.email('ayanda');
connection.query(`INSERT INTO user SET signin = "Ayanda", name = "Ayanda", surname = "Biyela", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "30", gender = "female", city = "Cape Town", description = "Girl is hot", sexual_preference = "male", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "soccer"');
console.log('User Ayanda created !');

/*
* Sindi
*/
var randomemail = faker.internet.email('Sindi');
connection.query(`INSERT INTO user SET signin = "Sindi", name = "Sindi", surname = "Zwane", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "20", gender = "female", city = "Cape Town", description = "Girl is hot", sexual_preference = "both", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "soccer"');
console.log('User Sindi created !');

/*
* Gugu
*/
var randomemail = faker.internet.email('Gugu');
connection.query(`INSERT INTO user SET signin = "Gugu", name = "Gugu", surname = "Zwane", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "24", gender = "female", city = "Cape Town", description = "Girl is hot", sexual_preference = "female", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "soccer"');
console.log('User Gugu created !');

/*
* Thabo
*/
var randomemail = faker.internet.email('Thabo');
connection.query(`INSERT INTO user SET signin = "Thabo", name = "Thabo", surname = "Biyela", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "30", gender = "male", city = "Cape Town", description = "Man is hot", sexual_preference = "male", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "soccer"');
console.log('User Ayanda created !');

/*
* Jason
*/
var randomemail = faker.internet.email('Sindi');
connection.query(`INSERT INTO user SET signin = "Jason", name = "Jason", surname = "Zwane", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "20", gender = "male", city = "Cape Town", description = "Man is hot", sexual_preference = "both", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "soccer"');
console.log('User Sindi created !');

/*
* Mandla
*/
var randomemail = faker.internet.email('Mandla');
connection.query(`INSERT INTO user SET signin = "Mandla", name = "Mandla", surname = "Zwane", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "24", gender = "male", city = "Cape Town", description = "Man is hot", sexual_preference = "female", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "soccer"');
console.log('User Mandla created !');


/*
* Ayanda
*/
var randomemail = faker.internet.email('ayanda');
connection.query(`INSERT INTO user SET signin = "Ayanda", name = "Ayanda", surname = "Biyela", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "30", gender = "female", city = "Mahikeng", description = "Girl is hot", sexual_preference = "male", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "soccer"');
console.log('User Ayanda created !');

/*
* Sindi
*/
var randomemail = faker.internet.email('Sindi');
connection.query(`INSERT INTO user SET signin = "Sindi", name = "Sindi", surname = "Zwane", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "20", gender = "female", city = "Mahikeng", description = "Girl is hot", sexual_preference = "both", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "soccer"');
console.log('User Sindi created !');

/*
* Gugu
*/
var randomemail = faker.internet.email('Gugu');
connection.query(`INSERT INTO user SET signin = "Gugu", name = "Gugu", surname = "Zwane", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "24", gender = "female", city = "Mahikeng", description = "Girl is hot", sexual_preference = "female", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "soccer"');
console.log('User Gugu created !');

/*
* Thabo
*/
var randomemail = faker.internet.email('Thabo');
connection.query(`INSERT INTO user SET signin = "Thabo", name = "Thabo", surname = "Biyela", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "30", gender = "male", city = "Mahikeng", description = "Man is hot", sexual_preference = "male", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "soccer"');
console.log('User Ayanda created !');

/*
* Jason
*/
var randomemail = faker.internet.email('Sindi');
connection.query(`INSERT INTO user SET signin = "Jason", name = "Jason", surname = "Zwane", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "20", gender = "male", city = "Mahikeng", description = "Man is hot", sexual_preference = "both", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "soccer"');
console.log('User Sindi created !');

/*
* Mandla
*/
var randomemail = faker.internet.email('Mandla');
connection.query(`INSERT INTO user SET signin = "Mandla", name = "Mandla", surname = "Zwane", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "24", gender = "male", city = "Mahikeng", description = "Man is hot", sexual_preference = "female", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "soccer"');
console.log('User Mandla created !');

/*
* Ayanda
*/
var randomemail = faker.internet.email('ayanda');
connection.query(`INSERT INTO user SET signin = "Ayanda", name = "Ayanda", surname = "Biyela", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "30", gender = "female", city = "Port Elizabeth", description = "Girl is hot", sexual_preference = "male", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "soccer"');
console.log('User Ayanda created !');

/*
* Sindi
*/
var randomemail = faker.internet.email('Sindi');
connection.query(`INSERT INTO user SET signin = "Sindi", name = "Sindi", surname = "Zwane", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "20", gender = "female", city = "Port Elizabeth", description = "Girl is hot", sexual_preference = "both", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Sindi", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Sindi", tag = "soccer"');
console.log('User Sindi created !');

/*
* Gugu
*/
var randomemail = faker.internet.email('Gugu');
connection.query(`INSERT INTO user SET signin = "Gugu", name = "Gugu", surname = "Zwane", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "24", gender = "female", city = "Port Elizabeth", description = "Girl is hot", sexual_preference = "female", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Gugu", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Gugu", tag = "soccer"');
console.log('User Gugu created !');

/*
* Thabo
*/
var randomemail = faker.internet.email('Thabo');
connection.query(`INSERT INTO user SET signin = "Thabo", name = "Thabo", surname = "Biyela", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "30", gender = "male", city = "Port Elizabeth", description = "Man is hot", sexual_preference = "male", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Thabo", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Thabo", tag = "soccer"');
console.log('User Thabo created !');

/*
* Jason
*/
var randomemail = faker.internet.email('Jason');
connection.query(`INSERT INTO user SET signin = "Jason", name = "Jason", surname = "Zwane", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "20", gender = "male", city = "Port Elizabeth", description = "Man is hot", sexual_preference = "both", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Jason", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Jason", tag = "soccer"');
console.log('User Jason created !');

/*
* Mandla
*/
var randomemail = faker.internet.email('Mandla');
connection.query(`INSERT INTO user SET signin = "Mandla", name = "Mandla", surname = "Zwane", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "24", gender = "male", city = "Port Elizabeth", description = "Man is hot", sexual_preference = "female", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Mandla", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Mandla", tag = "soccer"');
console.log('User Mandla created !');


/*
* Ayanda
*/
var randomemail = faker.internet.email('ayanda');
connection.query(`INSERT INTO user SET signin = "Ayanda", name = "Ayanda", surname = "Biyela", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "30", gender = "female", city = "Nelspruit", description = "Girl is hot", sexual_preference = "male", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Ayanda", tag = "soccer"');
console.log('User Ayanda created !');

/*
* Sindi
*/
var randomemail = faker.internet.email('Sindi');
connection.query(`INSERT INTO user SET signin = "Sindi", name = "Sindi", surname = "Zwane", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "20", gender = "female", city = "Nelspruit", description = "Girl is hot", sexual_preference = "both", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Sindi", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Sindi", tag = "soccer"');
console.log('User Sindi created !');

/*
* Gugu
*/
var randomemail = faker.internet.email('Gugu');
connection.query(`INSERT INTO user SET signin = "Gugu", name = "Gugu", surname = "Zwane", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "24", gender = "female", city = "Nelspruit", description = "Girl is hot", sexual_preference = "female", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Gugu", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Gugu", tag = "soccer"');
console.log('User Gugu created !');

/*
* Thamba
*/
var randomemail = faker.internet.email('Themba');
connection.query(`INSERT INTO user SET signin = "Themba", name = "Themba", surname = "Biyela", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "30", gender = "male", city = "Nelspruit", description = "Man is hot", sexual_preference = "male", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Themba", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Themba", tag = "soccer"');
console.log('User Themba created !');

/*
* Jabu
*/
var randomemail = faker.internet.email('Jabu');
connection.query(`INSERT INTO user SET signin = "Jabu", name = "Jabu", surname = "Zwane", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "20", gender = "male", city = "Nelspruit", description = "Man is hot", sexual_preference = "both", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Jabu", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Jabu", tag = "soccer"');
console.log('User Jabu created !');

/*
* Anda
*/
var randomemail = faker.internet.email('Anda');
connection.query(`INSERT INTO user SET signin = "Anda", name = "Andla", surname = "Zwane", email = '${randomemail}', passwd = "$2a$10$.QQ1jYykOeWog.kHXL83N.Bxeg70a8jbOzo4E02EYGBy1JmwgHYF6", register = "2020-07-16 10:29:49", age = "24", gender = "male", city = "Nelspruit", description = "Man is hot", sexual_preference = "female", profilePic = "simba.jpg", latitude = "26.2041", longitude = "28.0473", hash = "t0.9740370072815676", connect = "2020-07-16 11:20:31", verified = 1`);
connection.query('INSERT INTO tag SET signin = "Anda", tag = "chess"');
connection.query('INSERT INTO tag SET signin = "Anda", tag = "soccer"');
console.log('User Anda created !');


/*
* POPULARITY
*/
connection.query('INSERT INTO popularity SET signin = "Sakhile", popular = 120');
connection.query('INSERT INTO popularity SET signin = "Ayanda", popular = 100');
connection.query('INSERT INTO popularity SET signin = "Sindi", popular = 80');
connection.query('INSERT INTO popularity SET signin = "Gugu", popular = 140');
connection.query('INSERT INTO popularity SET signin = "Anda", popular = 120');
connection.query('INSERT INTO popularity SET signin = "Thabo", popular = 100');
connection.query('INSERT INTO popularity SET signin = "Jabu", popular = 100');
connection.query('INSERT INTO popularity SET signin = "Jason", popular = 80');
connection.query('INSERT INTO popularity SET signin = "Gugu", popular = 140');
connection.query('INSERT INTO popularity SET signin = "Mandla", popular = 140');
connection.query('INSERT INTO popularity SET signin = "Themba", popular = 140');
console.log("table popularity filled");


//End of connection
connection.end();
