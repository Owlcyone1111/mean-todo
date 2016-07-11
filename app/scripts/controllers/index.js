'use strict';

var angular = require('angular');

angular.module('todoListApp').controller('mainCtrl', require('./main.js'));
angular.module('todoListApp').controller('todoCtrl', require('./todo.js'));
