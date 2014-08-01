// index.js
var express = require('express');
var router = express.Router();
var passfile = require('../lib/passfile.js');
var taskfile = require('../lib/taskfile.js');

/* GET home page. */
router.get('/', function (req, res) {
	var passwordExists = passfile.exists();
	var tasksExist = taskfile.exists();
	var tasks = [];

	if (tasksExist) {
		tasks = taskfile.tasks();
	}

	res.render('index', { 
		title: 'Daily',
		passwordExists: passwordExists,
		tasksExist: tasksExist,
		tasks: tasks || [],
		when: function (condition, txt) {
			return condition ? txt : '';
		}
	});
});

module.exports = router;
