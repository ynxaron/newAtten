let attendanceApp = angular.module("attendanceApp", []);
attendanceApp.controller(
  "header",
  function ($scope, $http, $interval, $timeout) {
    $scope.userName = "DB ERROR";
    $scope.userJob = "DB ERROR";
    $scope.currentTime = "DB ERROR";
    $scope.firstName = "DB ERROR";

    $scope.greeting = () => {
      let this_hour = Number(moment().format("HH"));
      if (this_hour < 10) {
        return "Good Morning, ";
      } else if (this_hour < 16) {
        return "Good Afternoon, ";
      } else {
        return "Good evening, ";
      }
    };

    $http.get("data/user_info.json").then((response) => {
      $scope.userName = response.data.username;
      $scope.userJob = response.data.userjob;
      $scope.firstName = $scope.userName.split(" ")[0];
    });

    $interval(() => {
      $scope.currentTime = moment().format("HH:MM");
    }, 100);

    $scope.settingsVisible = false;
    $scope.refresh = () => {
      window.location.reload();
    };
    $scope.openSettings = () => {};
    $scope.toggleProfile = () => {
      if ($scope.settingsVisible) {
        $("#setting-overview").css("opacity", 0);
        $scope.settingsVisible = false;
      } else {
        $("#setting-overview").css("opacity", 1);
        $scope.settingsVisible = true;
      }
    };

    // BEGIN: Adding Border Animations
    $scope.thisClick = null;
    $scope.thisSelect = (btn_name) => {
      $scope.thisClick = btn_name;
      $timeout(() => {
        $scope.thisClick = null;
      }, 200); // 1/5th a second, should be enough
    };
    // END: Adding Border Animations
  },
);
