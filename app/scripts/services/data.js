'use strict';

function dataService ($http, $q) {
  this.getTodos = function(cb) {
    //$http.get('/mock/todos.json').then(cb);
    $http.get('/api/todos').then(cb);
  };
  
  this.deleteTodo = function(todo) {
    console.log("I deleted the " + todo.name + " todo!");
  };
  
  this.saveTodos = function(todos) {
    //console.log("I saved " + todos.length + " todos!");
    var queue = [];
    todos.forEach(function(todo) {
      var request;
      if (!todo._id) {
        request = $http.post('/api/todos', todo); // Create new post if doesn't already exist using POST method
      } else {
        request = $http.put('/api/todos/' + todo._id, todo).then(function(result) {
          todo = result.data.todo;
          return todo;
        });
      }
      queue.push(request);
    });
    return $q.all(queue).then(function(results) {
      console.log("I saved " + todos.length + " todos!");
    })
  };
  
}

module.exports = dataService;
