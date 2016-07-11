'use strict';

var express = require('express');
var Todo = require('../models/todo.js');
//var todos = require('../../mock/todos.json'); // Mock data

var router = express.Router();

// /api/todos to avoid conflicts, or use router.get instead of app.get
router.get('/todos', function(req, res) {
	Todo.find({}, function(err, todos) {
		if (err) {
			res.status(500).json({message: err.message});
		}
		res.json({todos: todos});
	});
});

// TODO: Add POST route to create new entries
router.post('/todos', function(req, res) {
	var todo = req.body;
	Todo.create(todo, function(err, todo) {
		if (err) {
			return res.status(500).json({err: err.message});
		}
		res.json({'todo': todo, message: 'Todo Created'});
	})
	
});

// TODO: Add PUT route to update existing entries, : indicates id is a parameter
router.put('/todos/:id', function(req, res) {
	var id = req.params.id;
	var todo = req.body;
	if (todo && todo._id !== id) {
		return res.status(500).json({err: "Ids don't match!"})
	}
	// {new: true} optional parameter to want new data
	Todo.findByIdAndUpdate(id, todo, {new: true}, function(err, todo) {
		if (err) {
			return res.status(500).json({err: err.message});
		}
		res.json({'todo': todo, message: 'Todo Updated'});
	})
});

// TODO: Add DELETE route to delete entries
router.delete('/todos/:id', function(req, res) {
	var id = req.params.id;
	Todo.findByIdAndRemove(id, function(err, result) {
		if (err) {
			return res.status(500).json({ err: err.message });
		}
		res.json({ message: 'Todo Deleted' });
	});
});

module.exports = router;
