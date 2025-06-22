angular
  .module("attendanceApp")
  .controller("LoginController", function ($scope, $location, AuthService) {
    $scope.email = "";
    $scope.password = "";
    $scope.error = "";

    $scope.login = function () {
      if (AuthService.login($scope.email, $scope.password)) {
        $location.path("/dashboard");
      } else {
        $scope.error = "Invalid credentials.";
      }
    };
  });
