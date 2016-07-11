'use strict';

function todo (){
  return {
    templateUrl: 'templates/todo.html',
    replace: true,
    controller: 'todoCtrl'
  }
}

module.exports = todo;