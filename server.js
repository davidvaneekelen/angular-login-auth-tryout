var express = require('express');
var faker = require('faker');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var user = {
	username: 'david',
	password: 'vaneekelen'
}

app.use(cors());
app.use(bodyParser.json());

app.get('/random-user', function(req, res) {
	var user = faker.helpers.createCard();
	user.avatar = faker.image.avatar();
	res.json(user);
});

app.post('/login', authenticate, function(req, res) {
	res.send(user);
});

app.listen(3030, function() {
	console.log('Server running on localhost:3030');
});

// UTIL FUNCTIONS

function authenticate(req, res, next) {
	var body = req.body;
	if (!body.username || !body.password) {
		res.status(400).end('Must provide username and password.');
	}
	if (body.username != user.username || body.password != user.password) {
		res.status(401).end('Username and/or password incorrect.');
	}
}