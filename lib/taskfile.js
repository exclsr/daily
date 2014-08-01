// taskfile.js
var fs = require('fs');

var path = './data/tasks.txt';

exports.exists = function () {
	return fs.existsSync(path);
};

exports.save = function (data, callback) {
	var lines = data.split('\n');
	var count = 0;
	var tasks = lines.map(function (line) {
		count++;
		var task = {
			id: count, 
			summary: line.trim(),
			status: 'nope'
		};
		return task;
	});

	var json = JSON.stringify(tasks);
	fs.writeFile(path, json, callback);
};

var readTasks = function () {
	var data = fs.readFileSync(path);
	var tasks = JSON.parse(data);
	return tasks;
};

exports.tasks = readTasks;

exports.update = function (taskId, status, callback) {
	var tasks = readTasks();

	for (var i=0; i < tasks.length; i++) {
		if (tasks[i].id.toString() === taskId.toString()) {
			tasks[i].status = status;
		}
	}

	console.log(tasks);
	var json = JSON.stringify(tasks);
	fs.writeFile(path, json, callback);
};