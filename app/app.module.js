let newAtten = angular.module("newAtten", ["ngRoute"]);
newAtten.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "app/views/login.html",
      controller: "loginController",
    })

    .when("/dashboard", {
      templateUrl: "app/views/dashboard.html",
      controller: "dashboardController",
    })

    .when("/admin", {
      templateUrl: "app/views/admin.html",
      controller: "adminController",
    })

    .when("/setting", {
      templateUrl: "app/views/settings.html",
    });
});
