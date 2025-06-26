newAtten.controller(
  "dashboardController",
  function ($scope, $http, $interval, $timeout, pictures, jsons, $log) {
    if (localStorage.getItem("loggedIn") === false) {
      window.location.href = "/";
      return;
    }
    $scope.userName = "DB ERROR";
    $scope.userJob = "DB ERROR";
    $scope.currentTime = "DB ERROR";
    $scope.firstName = "DB ERROR";

    // BEGIN: Adding Functionalities to Services across dashboard
    // Pictures
    $scope.profileImgSrc = pictures.imgSrc("Satyam Prakash");
    $scope.djuboImgSrc = pictures.djuboImg();
    // Jsons
    $scope.emp_info = jsons.emp_info();
    $scope.onlines = jsons.onlines();
    $scope.user_info = jsons.user_info();
    $scope.user_session = jsons.user_session();
    $scope.thisuser_data = jsons.thisuser_data();
    $scope.thisuser_dataval = null;
    // END: Adding Functionalities to Services across dashboard
    //
    // BEGIN: Extracting JSON Object from thisuser_info.
    // This would be used to pass the json object to main_script wrapper
    // function so that this could then be indexed to provide charts with address
    // else, this would log the error
    $http
      // we are loading the DOM when we can read the $scope.thisuser_data value
      .get($scope.thisuser_data)
      .then(function (response) {
        $timeout(() => {
          if (typeof setupDashboardUI === "function")
            // Sending source of online profiles & charts and calendars as well (in an object)
            setupDashboardUI($scope.onlines, response.data);
          if (typeof sidebarUI === "function") sidebarUI();
        }, 0);
      })
      .catch(function () {
        $log.error(
          "Cannot Get data at the given source: " + $scope.thiseuser_data,
        );
      });
    // END: Extracting JSON Object from thisuser_info

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

    $http.get($scope.user_info).then((response) => {
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

    $scope.openSettings = function () {
      window.location.href = "#!/setting";
    };

    // A logout function that would be used wherever there is logout button in dashboard.html
    $scope.logOut = function () {
      localStorage.setItem("loggedIn", false);
      window.location.href = "/";
    };
  },
);
