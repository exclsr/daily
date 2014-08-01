// tasks.js

var express  = require('express');
var taskfile = require('../lib/taskfile.js')

var router = express.Router();

router.get('/', function (req, res) {
	res.redirect('/');
});

// TODO: ensure auth
router.post('/', function (req, res) {
	var data = req.body;
	taskfile.save(data.tasks, function (err) {
		if (err) {
			return res.send(500, "Failed to save tasks.");
		}
		res.redirect('/');
	});
});

var exists = function (req, res, next) {
	if (!taskfile.exists()) {
		return res.send(400, "No tasks exist yet!");
	}
	next();
};

router.put('/:taskId', exists, function (req, res) {
	var taskId = req.params['taskId'];
	var status = req.body.status;
	console.log(status);
	taskfile.update(taskId, status, function (err) {
		if (err) {
			return res.send(500, err);
		}
		res.send(200);
	});
});

router.get('/all', exists, function (req, res) {
	res.send(200, taskfile.tasks());
});

module.exports = router;