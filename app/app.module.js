let newAtten = angular.module("newAtten", ["ngRoute"]);
newAtten.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "app/partial/login.html",
      controller: "loginController",
    })

    .when("/dashboard", {
      templateUrl: "app/partial/dashboard.html",
      controller: "dashboardController",
    })

    .when("/admin", {
      templateUrl: "app/partial/admin.html",
      controller: "adminController",
    })

    .when("/setting", {
      templateUrl: "app/partial/settings.html",
    });
});
