newAtten.controller(
  "dashboardController",
  function ($scope, $interval, $timeout, pictures, jsons, $log, $http) {
    if (localStorage.getItem("loggedIn") === "false") {
      window.location.href = "#!/";
      return;
    }

    // Defining WebSocket Link For Online Status Change
    $timeout(() => {
      // Inside This Timeout we are Defining A Function That takes our user id
      // (for identifying the particular user icon button), iconClass to add to,
      // and a `retries` variable, which decremenet until it hits 0. We would try
      // this same code `retry` amount of time, after which we would return with
      // console.error
      const updateStatus = function(userId, retries,iconClass) {
        const collegue = document.getElementById(`onlineStatus-${userId}`);
        if (!collegue) {
          if (retries > 0) {
            return updateStatus(userId, retries - 1, iconClass);
          } else {
            console.error(`After Several Retries, wasn't able to retrieve collegue with ${userId} user id`);
            return;
          }
        }
        console.log(`BEFORE: Collegue Icon Before Class Name: ${collegue.className}`);
        collegue.className = iconClass;
        console.log(`AFTER: Collegue Icon After Class Name: ${collegue.className}`);
      }

      const onlineStatusSocket = new WebSocket('ws://localhost:8000/ws/online/');
      onlineStatusSocket.onmessage = function(event) {
        $scope.$apply(() => {
          const data = JSON.parse(event.data);
          console.log(data);
          const userId = data.user_id;
          const iconClass = (data.status === "online")
            ? "fas fa-circle me-3 text-success" :
            "fas fa-circle me-3 text-secondary";

          updateStatus(userId, 4, iconClass);
        })
      }
    }, 0)
    // Static UI defaults
    $scope.userName = "DB ERROR";
    $scope.userJob = "DB ERROR";
    $scope.currentTime = "DB ERROR";
    $scope.firstName = "DB ERROR";

    // Load image paths
    pictures.imgSrc().then(function (image) {
      $scope.profileImgSrc = image;
    })
    pictures.djuboImg().then(function (img) {
      $scope.djuboImgSrc = img;
    })

    $scope.openLeave = function() {
      window.location.href = "#!/applyLeave";
    }


    // Load JSON data (returns promises now)
    jsons.user_info().then((response) => {
      $scope.userName = response.username;
      $scope.userJob = response.userjob;
      $scope.skills = response.skills;
      $scope.joined = response.joined;
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
          if (typeof sidebarUI === "function") {
            sidebarUI();
          };
        });
      })
      .catch(() => {
        $log.error("Could not load thisuser_data via jsons service.");
      });

    // For Collegue Overview
    jsons.onlines().then((data) => {
      $scope.getCollegueInfo = _.map(data, function (member, index) {
        return {
          id: member.id,
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
      $http.post(`http://localhost:8000/employee/logout`, {}).then(function (res) {
        if (res.status !== 200) {
          console.error("Something Went Wrong...Wasn't Able to Log You Out");
        }
        console.log(res.data);
        sessionStorage.clear();
        localStorage.clear();

        document.cookie = "sessionid=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        document.cookie = "csrftoken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";

        localStorage.setItem("loggedIn", "false");
        window.location.href = "#!/";
      }).catch(function (err) {
        console.error(`Some Error Happened While Loggin Out: ${err.data['error']}`);
      })
    };
  }
);
