'use strict';

var mongoose = require('mongoose');

// todo.name
// todo.completed

// Schema constructor
var todoSchema = new mongoose.Schema({
	name: String,
	completed: Boolean
});

// Create model called Todo using todoSchema
var model = mongoose.model('Todo', todoSchema);

module.exports = model;