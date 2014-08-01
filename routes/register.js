// register.js

var express  = require('express');
var fs       = require('fs');
var passfile = require('../lib/passfile.js')

var router = express.Router();

router.get('/', function (req, res) {
	res.redirect('/');
});

router.post('/', function (req, res) {
	if (passfile.exists()) {
		var message = "Sorry, this instance of Daily already has an owner.";
		return res.send(400, message);
	}

	var data = req.body;
	var password = data.pass;

	passfile.create(password, function (err) {
		if (err) {
			return res.send(500, err);
		}
		return res.redirect('/');
	});
});

module.exports = router;
