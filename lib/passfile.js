// passfile.js
var fs = require('fs');
var encrypt = require('./encrypt.js');

var path = './data/password.txt';

exports.path = path;

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

	var buffer = JSON.stringify(contents);

	fs.writeFile(path, buffer, callback);	
};