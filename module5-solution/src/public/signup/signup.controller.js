(function() {
'use strict';

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['MenuService', 'UserService'];
function SignupController(MenuService, UserService) {
  var ctrl = this;
  ctrl.user = UserService.getUser(); // Retrieve user data if already exists
  ctrl.invalidFavItem = false; // Show warning if the favourite is incorrect
  ctrl.submitSuccess = false; // Shows message after a successfull submit

  // Bonus task 3
  // Called when the Favourite Item input loses focus (ng-blur)
  // Checks if the value in the favourite item input is correct
  ctrl.checkFavItem = function(favItem) {
    if (favItem) {
      MenuService.getSingleMenuItem(favItem).then(function (fav) {
        if (fav) {
          ctrl.invalidFavItem = false;
        } else {
          ctrl.invalidFavItem = true;
        }
      });
    } else { // Empty value is correct
      ctrl.invalidFavItem = false;
    }
  };

  // Helper function to store the data (called by "ctrl.submit")
  function saveData() {
    UserService.setUser(
      ctrl.user.firstName,
      ctrl.user.lastName,
      ctrl.user.email,
      ctrl.user.phoneNr,
      ctrl.user.favItem
    );
    ctrl.submitSuccess = true;
  }

  // Submit the form and stores the its input (assumption -> the input is valid)
  ctrl.submit = function() {
    ctrl.invalidFavItem = false; // Shows warning flag
    ctrl.submitSuccess = false; // Hides form and show success message

    // If a favourite is entered check whether it exists
    // The itesm are requested to the server and therefore handled asynchronously
    if (ctrl.user.favItem) {
      MenuService.getSingleMenuItem(ctrl.user.favItem).then(function (fav) {
        if (fav) {
          saveData();
        } else {
          ctrl.invalidFavItem = true;
        }
      });
    } else { // No favourite entered
      saveData();
    }
  };

}

}());
