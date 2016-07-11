'use strict';

function mainCtrl ($scope, $log, $interval, dataService){
	$scope.seconds = 0;

	$scope.counter = function() {
		$scope.seconds++;
		$log.log($scope.seconds + ' have passed!');
		$log.warn($scope.seconds + ' have passed!');
		$log.error($scope.seconds + ' have passed!');
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