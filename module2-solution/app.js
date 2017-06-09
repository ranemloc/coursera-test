(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)

// Controller for the list of to be bought items
ToBuyController.$inject = ['ShoppingListCheckOffService']
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyCtrl = this;

  toBuyCtrl.items = ShoppingListCheckOffService.getToBuyItems();

  toBuyCtrl.checkOffItem = function(itemIndex) {
    ShoppingListCheckOffService.checkOffItem(itemIndex);
  }
}

// Controller for the list of already bought items
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService']
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtCtrl = this;

  boughtCtrl.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
}

// Service providing access to the AlreadyBought and ToBuy lists
function ShoppingListCheckOffService() {
  var service = this;

  var toBuyItems = [
    { name: "Apples"    , quantity: 10 }
   ,{ name: "Bananas"   , quantity: 5  }
   ,{ name: "Avocados"  , quantity: 3  }
   ,{ name: "Lemons"    , quantity: 7  }
   ,{ name: "Melons"    , quantity: 1  }
  ];

  var alreadyBoughtItems = [];

  service.getToBuyItems = function() {
    return toBuyItems;
  }

  service.getAlreadyBoughtItems = function() {
    return alreadyBoughtItems;
  }

  service.checkOffItem = function(itemIndex) {
    alreadyBoughtItems.push(toBuyItems.splice(itemIndex, 1)[0]);
  }
}

})();
