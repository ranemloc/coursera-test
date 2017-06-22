(function() {
'use strict';

// Component displaying the list of categories in the restaurant's menu
// Receives the categories to display from the state's resolver
angular.module('MenuApp')
.component('categoryList', {
  templateUrl: 'src/menuapp/templates/categories.template.html',
  bindings: {
    items: '<',
  },
});

}());
