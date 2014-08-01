// passfile.js
var fs = require('fs');
var encrypt = require('./encrypt.js');

var path = './data/password.txt';

exports.exists = function () {
	return fs.existsSync(path);
};

exports.create = function (password, callback) {
	var salt = encrypt.salt();
	var hashedPassword = encrypt.hash(password, salt);

	var contents = {
		salt: salt,
		password: hashedPassword
	};

	var json = JSON.stringify(contents);
	fs.writeFile(path, json, callback);	
};