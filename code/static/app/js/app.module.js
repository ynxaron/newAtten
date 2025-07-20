let newAtten = angular.module("newAtten", ["ngRoute"]);
newAtten.config(function ($routeProvider, $httpProvider) {
  $httpProvider.defaults.withCredentials = true;
  $httpProvider.interceptors.push("authInterceptor");
  $routeProvider
    .when("/", {
      templateUrl: "/static/app/partial/login.html",
      controller: "loginController",
    })

    .when("/dashboard", {
      templateUrl: "/static/app/partial/dashboard.html",
      controller: "dashboardController",
    })

    .when("/admin", {
      templateUrl: "/static/app/partial/admin.html",
      controller: "adminController",
    })

    .when("/setting", {
      templateUrl: "/static/app/partial/settings.html",
      controller: "settingsController",
    })
    .when("/applyLeave", {
      templateUrl: "/static/app/partial/applyLeave.html",
      controller: "applyLeaveController",
    });
});


newAtten.factory("authInterceptor", function() {
  return {
    request: function(config) {
      const token = sessionStorage.getItem("jwtToken");
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    }
  };
});
