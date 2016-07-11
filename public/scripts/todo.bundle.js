webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('todoListApp', []);

	__webpack_require__(3);
	__webpack_require__(6);
	__webpack_require__(8);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('todoListApp').controller('mainCtrl', __webpack_require__(4));
	angular.module('todoListApp').controller('todoCtrl', __webpack_require__(5));


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	function mainCtrl ($scope, $log, $interval, dataService){
		$scope.seconds = 0;

		$scope.counter = function() {
			$scope.seconds++;
			$log.log($scope.seconds + ' have passed!');
			$log.warn($scope.seconds + ' have passed!');
		}

		// Third parameter optional and is number of times to call function, default 0 and repeats infinitely
		$interval($scope.counter, 1000, 10);

		dataService.getTodos(function(response){
			var todos = response.data.todos;
			$scope.todos = todos;
		});

		$scope.addTodo = function() {
			$scope.todos.unshift({name: "This is a new todo.", completed: false});
		};
	}

	module.exports = mainCtrl;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	// Now a function because we attach controller to module inside index.js
	function todoCtrl ($scope, dataService) {

	  $scope.deleteTodo = function(todo, index) {
	    $scope.todos.splice(index, 1);
	    dataService.deleteTodo(todo);
	  };
	  
	  $scope.saveTodos = function() {
	    var filteredTodos = $scope.todos.filter(function(todo){
	      if(todo.edited) {
	        return todo
	      };
	    })
	    dataService.saveTodos(filteredTodos).finally($scope.resetTodoState()); // dataService.saveTodos returns a promise, so we can use finally to reset
	  };

	  $scope.resetTodoState = function() {
	    $scope.todos.forEach(function(todo) {
	      todo.edited = false;
	    });
	  };

	}

	module.exports = todoCtrl; // To be required in index.js

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('todoListApp').directive('todo', __webpack_require__(7));


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	function todo (){
	  return {
	    templateUrl: 'templates/todo.html',
	    replace: true,
	    controller: 'todoCtrl'
	  }
	}

	module.exports = todo;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('todoListApp').service('dataService', __webpack_require__(9));


/***/ },
/* 9 */
/***/ function(module, exports) {

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


/***/ }
]);