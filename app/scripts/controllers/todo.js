'use strict';

// Now a function because we attach controller to module inside index.js
function todoCtrl ($scope, dataService) {

  $scope.deleteTodo = function(todo, index) {
    // dataService.saveTodos returns a promise, so we can use .then()
    dataService.deleteTodo(todo).then(function() {
      $scope.todos.splice(index, 1);
    });
  };
  
  $scope.saveTodos = function() {
    var filteredTodos = $scope.todos.filter(function(todo){
      if(todo.edited) {
        return todo
      };
    })
    dataService.saveTodos(filteredTodos).finally($scope.resetTodoState()); // dataService.saveTodos returns a promise, so we can use .finally() to reset
  };

  $scope.resetTodoState = function() {
    $scope.todos.forEach(function(todo) {
      todo.edited = false;
    });
  };

}

module.exports = todoCtrl; // To be required in index.js