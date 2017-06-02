(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController ($scope) {
  $scope.lunchOrder = '';
  $scope.checkResult = '';

  $scope.check = function() {
    var result = '';

    // Regular expression to remove spaces before/after the commas
    var re = /\s*,\s*/;
    var items = $scope.lunchOrder.split(re);

    // Count only non-empty strings
    var itemCount = 0;
    for (var i = 0; i < items.length; i++) {
      if (items[i] != "") itemCount++;
    }

    // Calculatye the result
    if (itemCount == 0) {
      result = 'Please enter data first';
    } else if (itemCount <= 3) {
      result = 'Enjoy!';
    } else {
      result = 'Too much!';
    }

    $scope.checkResult = result;
  }

};

})();
