newAtten.controller(
  "dashboardController",
  function ($scope, $interval, $timeout, pictures, jsons, $log, $http) {
    if (localStorage.getItem("loggedIn") === "false") {
      window.location.href = "/frontend/#!";
      return;
    }

    // Static UI defaults
    $scope.userName = "DB ERROR";
    $scope.userJob = "DB ERROR";
    $scope.currentTime = "DB ERROR";
    $scope.firstName = "DB ERROR";

    // Load image paths
    pictures.imgSrc().then(function(image) {
      $scope.profileImgSrc = image;
    })
    pictures.djuboImg().then(function(img) {
      $scope.djuboImgSrc = img;
    })


    // Load JSON data (returns promises now)
    jsons.user_info().then((response) => {
      $scope.userName = response.username;
      $scope.userJob = response.userjob;
      $scope.firstName = $scope.userName.split(" ")[0];
      $scope.total_leaves_taken = response.total_leaves_taken;
      $scope.total_leaves_left = response.total_leaves_left;
      $scope.paid_overtime = response.paid_overtime;
      $scope.total_absent = response.total_absent;
    });

    jsons
      .thisuser_data()
      .then((response) => {
        $scope.weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        $scope.dayInfoArr = _.map(response.hours_by_day, function (hours, index) {
          return {
            hours: hours,
            dayNum: index + 1,
            weekDay: $scope.weekDays[(index + 1) % 7],
          };
        });

        $timeout(() => {
          if (typeof setupDashboardUI === "function") {
            setupDashboardUI(response);
          }
          if (typeof sidebarUI === "function") sidebarUI();
        });
      })
      .catch(() => {
        $log.error("Could not load thisuser_data via jsons service.");
      });

    // For Collegue Overview
    jsons.onlines().then((data) => {
      $scope.getCollegueInfo = _.map(data, function (member, index) {
        return {
          name: member.name,
          photo: member.photo,
          online: member.online,
          index: index,
          title: member.title,
          update: member.update,
          firstName: member.name.split(" ")[0],
          onlineStatusIcon: member.online
            ? "fas fa-circle me-3 text-success"
            : "fas fa-circle me-3 text-secondary",
        };
      });
    });

    // Time and Greeting
    $interval(() => {
      $scope.currentTime = moment().format("HH:mm");
      $scope.greeting = () => {
        const hour = Number(moment().format("HH"));
        return hour < 10
          ? "Good Morning, "
          : hour < 16
            ? "Good Afternoon, "
            : "Good Evening, ";
      };
    }, 100);

    // UI Logic
    $scope.settingsVisible = false;
    $scope.toggleProfile = () => {
      $scope.settingsVisible = !$scope.settingsVisible;
      $("#setting-overview").css("opacity", $scope.settingsVisible ? 1 : 0);
    };

    $scope.refresh = () => window.location.reload();
    $scope.openSettings = () => (window.location.href = "#!/setting");

    $scope.break_icon = "fas fa-mug-hot me-2";
    $scope.break_text = "BREAK";
    let on_break = false;
    $scope.toggleBreak = () => {
      on_break = !on_break;
      $scope.break_icon = on_break
        ? "fas fa-briefcase me-2"
        : "fas fa-mug-hot me-2";
      $scope.break_text = on_break ? "RESUME" : "BREAK";
    };

    $scope.thisClick = null;
    $scope.thisSelect = (btn_name) => {
      $scope.thisClick = btn_name;
      $timeout(() => ($scope.thisClick = null), 200);
    };

    $scope.logOut = () => {
      $http.post(`${URL}/employee/logout`, {}).then(function(res){
        console.log(res.data);
      }).catch(function(err){
        console.error(res.data);
      }).finally(function() {
        sessionStorage.clear();
        localStorage.setItem("loggedIn", "false");
        window.location.href = "!#/";
      })
    };
  },
);
