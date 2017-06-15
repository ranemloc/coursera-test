(function() {
  'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

//=========================================================
// Main controller that stores and manage the menu items
//=========================================================
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var ctrl = this;

  ctrl.searchTerm = ""; // The search term binded to the search box
  ctrl.found = []; // List of found items that match with the search term
  ctrl.nothingFound = false;

  ctrl.searchAndNarrow = function() {
    ctrl.found = [];
    ctrl.nothingFound = false;
    var st = ctrl.searchTerm.trim();
    if ( st == "") {
      ctrl.nothingFound = true;
    } else {
      MenuSearchService.getMatchedMenuItems(st).then(function(data){
        ctrl.found = data;
        if (ctrl.found.length == 0) {
          ctrl.nothingFound = true;
        }
      }).catch(function(error) {
        console.log("Something went wrong!");
      });
    }
  };

  ctrl.removeItem = function(itemIndex) {
    ctrl.found.splice(itemIndex, 1);
  };
}

//=========================================================
// Service to connect to the restaurant server
//=========================================================
MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  // Returns a promise with list of menu items conatining searchTerm
  // The items are first requested to the server and then filtered locally
  service.getMatchedMenuItems = function(searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function(resp) {
      var matchingItems = [];
      resp.data.menu_items.forEach(function(item) {
        if (item.description.toLowerCase().indexOf(searchTerm) !== -1) {
          matchingItems.push(item);
        }
      });
      return matchingItems; // the data in the returned promise
    });
  }
}

//=========================================================
// Custom directive to display & manage the list of found
// items and the button to remove items
//=========================================================
function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'menuList.html',
     scope: {
       items: '<',
       onRemove: '&',
     },
  };
  return ddo;
};

})();
