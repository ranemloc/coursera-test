(function() {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

// REST Service to retrieve data from the restaurant server
MenuDataService.$inject = ['$http', 'ApiBasePath'];
function MenuDataService($http, ApiBasePath) {
  var service = this;

  // Retrieves all the categories in the menu
  service.getAllCategories = function () {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json"),
    }).then(function(result) {
      return result.data;
    })
  };

  // Retrieves all the menu items of a given category
  service.getItemsForCategory = function (categoryShortName) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: categoryShortName
      },
    }).then(function(result) {
      return result.data;
    })
  };
}

}());
