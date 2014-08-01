// dayfile.js
var fs = require('fs');

var path = './data/day.txt';

exports.exists = function () {
	return fs.existsSync(path);
};

var readDay = function () {
	var data = fs.readFileSync(path);
	return Date.parse(data);
};

exports.isToday = function () {
	var day = readDay();
	var now = Date.now();

	if (day.year === now.year
		&& day.month === now.month
		&& day.day === now.day) {
		return true;
	}
	return false;
};

var create = function (callback) {
	var now = Date.now();
	fs.writeFile(path, now.toString(), callback);
};

exports.touch = function (callback) {
	create(callback);
};

exports.ensure = function (callback) {
	if (exports.exists()) {
		return callback();
	}

	create(callback);
};
