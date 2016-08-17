(function (angular) {
'use strict';

angular.module('pizzaMaker')
  .filter('list', function () {
    var _separator = ', ';
    return function (arr, separator) {
      if (!angular.isArray(arr)) return arr;
      return arr.join(separator || _separator);
    }
  });
})(angular);