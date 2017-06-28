(function() {
'use strict';

angular.module('public')
.service('UserService', UserService);

function UserService() {
  var service = this;

  // //Uncomment for testing without signup
  // service.user = {
  //   firstName: "Andres",
  //   lastName: "Sanchez",
  //   email: "a@b.c",
  //   phoneNr: "111-222-3333",
  //   favItem: "A3",
  // };

  // Set new user data
  service.setUser = function (firstName, lastName, email, phoneNr, favItem) {
    service.user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNr: phoneNr,
      favItem: favItem,
    };
  };

  // Set a new favourite
  service.setFavourite = function(favShortName) {
    if (service.user) {
      service.user.favItem = favShortName;
    } else {
      console.log("Error: The user is not initialized");
    }
  };

  // Retrieves a copy of the user data
  service.getUser = function () {
    if (service.user) {
      return Object.assign({}, service.user); // Return a copy of the stored object
    } else {
      return undefined;
    }
  };

}

}());
