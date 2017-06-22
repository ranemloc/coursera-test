(function() {
'use strict';

angular.module('MenuApp').config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {
    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // Set up UI states
    $stateProvider

    // Home page
    .state('home', {
      url: '/',
      templateUrl: 'src/menuapp/templates/home.template.html'
    })

    // Categories page
    .state('categories', {
      url: '/categories',
      component: 'categoryList', // Using component instead of controller (UI_router 1.0)
      resolve: {
        items: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })

    // Category items page
    .state('items', {
      url: '/items/{category}',
      component: 'menuItems', // Using component instead of controller (UI_router 1.0)
      resolve: {
        items: ['$stateParams', 'MenuDataService',
          function ($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.category);
          }]
      }
    })

}

}());
