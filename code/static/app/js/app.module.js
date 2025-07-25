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


// 'request' -> For Outgoing Requests
// 'requestError' -> For Outgoing Requests In Case Of Failures
// 'response' -> For Incoming Response
// 'responseError' -> For Incoming Responses In Case Of Request
newAtten.factory("authInterceptor", function() {
  return {
    request: function(request) {
      const token = sessionStorage.getItem("jwtToken");
      if (token) {
        request.headers["Authorization"] = "Bearer " + token;
      }
      return request;
    }
  };
});
