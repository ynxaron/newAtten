newAtten.controller(
  "dashboardController",
  function ($scope, $http, $interval, $timeout, pictures, jsons, $log) {
    if (localStorage.getItem("loggedIn") === "false") {
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
    // BEGIN: Defining a function that would send JSON for directive for collegue view
    $http.get($scope.onlines).then(function (response) {
      $scope.getCollegueInfo = _.map(response.data, function (member, index) {
        let online = member.online; // this would be used to send appropriate icon (offline/ online)
        return {
          name: member.name,
          photo: member.photo,
          online: member.online,
          index: index,
          title: member.title,
          update: member.update,
          firstName: member.name.split(" ")[0],
          onlineStatusIcon: online
            ? "fas fa-circle me-3 text-success"
            : "fas fa-circle me-3 text-secondary",
        };
      });
      console.log("Processed getCollegueInfo: " + $scope.getCollegueInfo);
    });
    // END: Defining a function that would send JSON for directive for collegue view
    // BEGIN: Extracting JSON Object from thisuser_info.
    // This would be used to pass the json object to main_script wrapper
    // function so that this could then be indexed to provide charts with address
    // else, this would log the error
    $http
      // we are loading the DOM when we can read the $scope.thisuser_data value
      .get($scope.thisuser_data)
      .then(function (response) {
        // BEGIN: Defining a function that would send data as json object for calendar overview directive
        $scope.weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        $scope.dayInfoArr = _.map(
          response.data.work_hours,
          function (hours, index) {
            return {
              hours: hours,
              dayNum: index + 1,
              weekDay: $scope.weekDays[(index + 1) % 7],
            };
          },
        );
        // END: Defining a function that would send data as json object for calendar overview directive
        //
        // BEGIN: Defining a function that would send data as json object for Online Collegues View

        // END: Defining a function that would send data as json object for Online Collegues View
        // BEGIN: Setting Up External JS Scripts via variables defined here
        $timeout(() => {
          if (typeof setupDashboardUI === "function")
            // Sending source of online profiles & charts and calendars as well (in an object)
            setupDashboardUI(response.data);
          if (typeof sidebarUI === "function") sidebarUI();
        }, 0);
        // END: Setting Up External JS Scripts via variables defined here
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
      // BEGIN: Petty Profile Info
      $scope.total_leaves_taken = response.data.total_leaves_taken;
      $scope.total_leaves_left = response.data.total_leaves_left;
      $scope.paid_overtime = response.data.paid_overtime;
      $scope.total_absent = response.data.total_absent;
      // END: Petty Profile Info
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

    // BEGIN: Defining the interactivity of the break icon
    $scope.break_icon = "fas fa-mug-hot me-2";
    $scope.break_text = "BREAK";
    let on_break = false;
    $scope.toggleBreak = function () {
      if (on_break) {
        $scope.break_icon = "fas fa-briefcase me-2";
        $scope.break_text = "RESUME";
      } else {
        $scope.break_icon = "fas fa-mug-hot me-2";
        $scope.break_text = "BREAK";
      }
      on_break ^= 1;
    };
    // END: Defining the interactivity of the break icon

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
