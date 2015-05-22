var express = require('express');
var faker = require('faker');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var jwtSecret = 'geheimman';

var user = {
	username: 'david',
	password: 'vaneekelen'
};

app.use(cors());
app.use(bodyParser.json());
app.use(expressJwt({ secret: jwtSecret }).unless({ path: ['/login'] }));

app.get('/random-user', function(req, res) {
	var user = faker.helpers.createCard();
	user.avatar = faker.image.avatar();
	res.json(user);
});

app.post('/login', authenticate, function(req, res) {
	var token = jwt.sign({
		username: user.username
	}, jwtSecret);

	res.send({
		token: token,
		user: user
	});
});

app.get('/me', function(req, res) {
	res.send(req.user);
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
	next();
}