/*jshint esversion: 6 */
(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);

MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  // Returns a list of all the menu categories
  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };

  // Returns all the items of a given category
  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  // Returns a single menu item given its short_name
  service.getSingleMenuItem = function (short_name) {
    return $http.get(ApiPath + '/menu_items.json').then(function (response) {
      return response.data.menu_items.find(x => x.short_name === short_name);
    });
  };

}



})();
