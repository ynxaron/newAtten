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

    .when("/setting", {
      templateUrl: "app/views/settings.html",
    });
});

newAtten.controller(
  "dashboardController",
  function ($scope, $http, $interval, $timeout) {
    $scope.userName = "DB ERROR";
    $scope.userJob = "DB ERROR";
    $scope.currentTime = "DB ERROR";
    $scope.firstName = "DB ERROR";

    $interval(() => {
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
    }, 100);

    $http.get("app/data/user_info.json").then((response) => {
      $scope.userName = response.data.username;
      $scope.userJob = response.data.userjob;
      $scope.firstName = $scope.userName.split(" ")[0];
    });

    $interval(() => {
      $scope.currentTime = moment().format("HH:mm");
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
    $timeout(() => {
      if (typeof setupDashboardUI === "function") setupDashboardUI();
      if (typeof sidebarUI === "function") sidebarUI();
    }, 0);

    $scope.openSettings = function () {
      window.location.href = "#!/setting";
    };
  },
);

newAtten.controller("loginController", function ($scope) {
  $scope.login = function () {
    const useremail = $scope.useremail;
    const password = $scope.password;

    if (useremail === "satyam.prakash@djubo.com" && password == "1234") {
      localStorage.setItem("loggedIn", true);
      window.location.href = "#!/dashboard";
    } else {
      showText("Wrong Username or Passwd");
    }
  };
});
