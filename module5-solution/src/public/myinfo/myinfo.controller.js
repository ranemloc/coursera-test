(function() {
'use strict';

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject= ['UserService', 'MenuService', 'favItem'];
function MyInfoController(UserService, MenuService, favItem) {
  var ctrl = this;
  ctrl.user = UserService.getUser();
  ctrl.favItem = favItem; // Favourite item object from the resolve
}

}());
