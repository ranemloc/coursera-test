(function() {
'use strict';

// Component displaying the list of menu items of a given category
// Receives the item to display from the state's resolver
angular.module('MenuApp')
.component('menuItems', {
  templateUrl: 'src/menuapp/templates/menu-items.template.html',
  bindings: {
    items: '<',
  },
  controller: ['$stateParams', function ($stateParams) {
    var ctrl = this;
    ctrl.category = $stateParams.category
  }]
});

}());
