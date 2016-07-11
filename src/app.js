'use strict';

var express = require('express');
var parser = require('body-parser');
var router = require('./api'); // Import index.js

require('./database');
require('./seed');

var app = express();

app.use('/', express.static('public')); // '/' by default if not specified
app.use(parser.json());
app.use('/api', router); // Mount router to app, serving from namespace /api

app.listen(3000, function() {
	console.log("The server is running on port 3000!");
});