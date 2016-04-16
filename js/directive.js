/*
 * @Author: liugengpc
 * @Date:   2016-04-16 17:35:29
 * @Last Modified by:   liugengpc
 * @Last Modified time: 2016-04-16 23:00:30
 */

(function(angular) {
  'use strict'
  var todoMVC = angular.module('todoMVC');
  todoMVC.directive('autoFocus', [function() {
    return {
      link: function($scope, iElm, iAttrs, controller) {
        iElm.on('dblclick', function() {
          angular.element(this).find('input').eq(1)[0].focus();
        });
      }
    };
  }]);
})(angular);
