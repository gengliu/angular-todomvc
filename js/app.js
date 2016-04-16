(function(angular) {
  'use strict';

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
  // 定义模块，
  var todoMVC = angular.module('todoMVC', []);
  // 定义控制器
  todoMVC.controller('mainCtroller', ['$scope', '$location', function($scope, $location) {
    // ===== 初始化数据成员 =====
    // 输入框
    $scope.input = '';
    // 列表
    $scope.todos = [
      { id: getId(), text: 'Angular', completed: true },
      { id: getId(), text: 'Bootstrap', completed: false },
      { id: getId(), text: 'React', completed: false }
    ];
    // 当前正在编辑的任务id
    $scope.currentEditingId = 0;
    // 双击启用编辑
    $scope.edit = function(current) {
      $scope.currentEditingId = current.id
    };
    // 回车保存
    $scope.save = function() {
      $scope.currentEditingId = 0;
    };
    // 添加任务
    $scope.add = function() {
      if (!$scope.input) return;
      $scope.todos.push({ id: getId(), text: $scope.input, completed: false });
      $scope.input = '';
    };
    // 删除元素，
    $scope.remove = function(current) {
      $scope.todos.splice($scope.todos.indexOf(current), 1);
    };
    // 获取todos中有没有已经完成的元素
    $scope.hasCompleted = function() {
        var hasCompleted = false;
        return $scope.todos.some(item => item.completed);
      }
      // 清空所有已经完成  ---- 不能在循环中删除数组元素
    $scope.clearCompleted = function() {
      var unCompleted = []; // 未完成的
      $scope.todos.forEach(function(item) {
        if (!item.completed) {
          unCompleted.push(item);
        }
      });
      $scope.todos = unCompleted;
    };
    $scope.checkedAll = false;
    // 选中所有
    $scope.allCompleted = function() {
      $scope.todos.forEach(function(item) {
        item.completed = $scope.checkedAll;
      });
    };
    // 筛选问题
    $scope.filterData = {};
    // 改变状态
    $scope.changeFilter = function(newfilter) {
        $scope.filterData = newfilter;
      }
      // 暴露url方变监视
    $scope.location = $location;
    $scope.$watch('location.url()', function(newValue) {
      switch (newValue) {
        case '/active':
          $scope.filterData = { completed: false };
          break;
        case '/completed':
          $scope.filterData = { completed: true };
          break;
        default:
         $scope.filterData = {};
         break;
      }
    });
  }]);

})(angular);
