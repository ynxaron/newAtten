newAtten.controller("applyLeaveController", function ($scope, $http, pictures) {
  if (localStorage.getItem("loggedIn") === "false") {
    window.location.href = "#!";
  }

  $("#leaveBegin").datepicker({
    dateFormat: "dd M yy",
    showAnim: "fadeIn",
    changeMonth: true,
    changeYear: true,
    showButtonPanel: true
  });

  $("#leaveEnd").datepicker({
    dateFormat: "dd M yy",
    showAnim: "fadeIn",
    changeMonth: true,
    changeYear: true,
    showButtonPanel: true
  });

  pictures.djuboImg().then((img) => {
    $scope.djuboIcon = img;
  }).catch((err) => {
    console.error(`Wasn't Able To Get Djubo Icon\n${err}`);
  });
  $scope.submitLeave = function () {
    if (!($scope.leaveBeginDate && $scope.leaveEndDate && $scope.reason)) {
      showText("Pick The Dates Before Proceeding");
      return;
    }

    let leave_begin = $scope.leaveBeginDate.split('/').slice(0, 2).reverse().join('-');
    let leave_end = $scope.leaveEndDate.split('/').slice(0, 2).reverse().join('-');

    let leave_range = `${leave_begin}->${leave_end}`;

    let postObject = {
      leave_range: leave_range,
      leave_message: $scope.reason,
    };

    if (!leave_begin || !leave_end) {
      console.error("Leave Dates weren't able to be configured. Make sure moment.js is loaded...");
      return;
    }

    return $http.post('http://localhost:8000/employee/applyLeave', postObject)
      .then((res) => {
        console.log(`Succesfully Updated Your Leave Message!\n${res.data.message}`);
        showText("Sent Leave Request");
        }
      ).catch((err) => {
        console.error(`Something Went Wrong While Sending the Leave Request\n${err.data.error}`)
        showText("Something Went Wrong...");
      })
  }
});
