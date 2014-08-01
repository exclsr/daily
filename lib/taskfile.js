// taskfile.js
var fs = require('fs');

var path = './data/tasks.txt';
var unchecked = 'nope';

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
			status: unchecked
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

var writeTasks = function (tasks, callback) {
	var json = JSON.stringify(tasks);
	fs.writeFile(path, json, callback);
}

exports.update = function (taskId, status, callback) {
	var tasks = readTasks();

	for (var i=0; i < tasks.length; i++) {
		if (tasks[i].id.toString() === taskId.toString()) {
			tasks[i].status = status;
		}
	}

	writeTasks(tasks, callback);
};

exports.uncheckAll = function (callback) {
	var tasks = readTasks();
	for (var i=0; i < tasks.length; i++) {
		tasks[i].status = unchecked;
	}

	writeTasks(tasks, callback);
};