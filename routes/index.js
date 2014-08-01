// index.js
var express = require('express');
var router = express.Router();
var passfile = require('../lib/passfile.js');

/* GET home page. */
router.get('/', function (req, res) {
	var passwordExists = passfile.exists();

	res.render('index', { 
		title: 'Daily',
		passwordExists: passwordExists
	});
});

module.exports = router;
