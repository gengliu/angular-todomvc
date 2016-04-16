/*
 * @Author: liugengpc
 * @Date:   2016-04-16 17:46:41
 * @Last Modified by:   liugengpc
 * @Last Modified time: 2016-04-16 22:35:06
 */
(function(angular) {
  var todoMVC = angular.module('todoMVC');
  todoMVC.service('Storage', ['$window', function($window) {
    // 递归实现每次取不同的id
    function getId() {
      var arr = [];
      for (var i = 0; i < arr.length; i++) {
        if (id === arr[i]) {
          getId();
        }
      }
      var id = Math.random();
      var arr = [];
      arr.push(id);
      return id;
    }
    var storage = $window.localStorage;
    var todos = JSON.parse(storage.getItem('my_todos') || '[]');
    // 从本第获取数据
    this.get = function() {
      return todos;
    };
    // 定义设置数据的公共方法
    this.save = function() {
      storage.setItem('my_todos', JSON.stringify(todos));
    };
    // 添加数据到本地
    this.add = function(input) {
      todos.push({ id: getId(), text: input, completed: false });
      this.save();
    };
    // 从本地删除数据
    this.remove = function(current) {
      todos.splice($scope.todos.indexOf(current), 1);
      this.save();
    };
    // 遍历所有已经完成的
    this.hasCompleted = function() {
      return todos.some(item => item.completed);
    };
    // 清空所有已经完成  ---- 不能在循环中删除数组元素
    this.clearCompleted = function() {
      var unCompleted = []; // 未完成的
      todos.forEach(function(item) {
        if (!item.completed) {
          unCompleted.push(item);
        }
      });
      todos = unCompleted;
      return todos;
    };
    // 选中所有
   this.allCompleted = function(checked) {
      todos.forEach(function(item) {
        item.completed = checked;
      });
    };

  }])
})(angular);
