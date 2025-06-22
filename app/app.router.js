angular.module("attendanceApp", ["ngRoute"]).config(function ($routeProvider) {
  $routeProvider
    .when("/login", {
      templateUrl: "app/views/login.html",
      controller: "LoginController",
    })
    .when("/dashboard", {
      templateUrl: "app/views/dashboard.html",
      controller: "MainController",
      resolve: {
        auth: function (AuthService, $location) {
          if (!AuthService.isLoggedIn()) {
            $location.path("/login");
          }
        },
      },
    })
    .otherwise({
      redirectTo: "/login",
    });
});
