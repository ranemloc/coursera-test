(function () {
"use strict";

angular.module('public')
.component('menuItem', {
  templateUrl: 'src/public/menu-item/menu-item.html',
  bindings: {
    menuItem: '<'
  },
  controller: MenuItemController
});


MenuItemController.$inject = ['ApiPath', 'UserService', '$scope'];
function MenuItemController(ApiPath, UserService, $scope) {
  var $ctrl = this;
  $ctrl.basePath = ApiPath;
  var user = UserService.user;
  $ctrl.userExists = UserService.user !== undefined;

  $ctrl.isFav = function () {
    if (user) {
      return user.favItem === $ctrl.menuItem.short_name;
    } else {
      return false;
    }
  };

  $ctrl.setFavourite = function() {
    UserService.setFavourite($ctrl.menuItem.short_name);
    $ctrl.currentFav = true;
  };
}

})();
