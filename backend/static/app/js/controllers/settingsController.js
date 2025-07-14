console.log("settingsController, Running....");
newAtten.controller("settingsController", function ($http, $scope) {
  const URL = "http://localhost:8000";
  if (localStorage.getItem("loggedIn") === "false") {
    window.location.href = "#!"
  }

  $scope.updateProfile = function () {
    const payload = {
      fullname: $scope.fullName,
      useremail: $scope.useremail,
      job: $scope.job
    };

    $http.post(`${URL}/employee/updateProfile`, payload).then(function (res) {
      if (res.status !== 200) {
        showText("Something Went Wrong, Profile Updated Partially");
        console.error("Error In Updating Profile: " + res["error"]);
        return;
      }
      showText("Profile Updated Succesfully!");
    }).catch(function (err) {
      showText("Something Went Wrong! Check Console");
      console.error(`Unable to Update Profile With EndPoint: ${URL}/employee/updateProfile}\n${err.status}\n${err.data}`);
    })
  }

  $scope.updatePassword = function () {
    console.log("Update Password has been hit...");
    if ($scope.newPassword != $scope.newPasswordAgain) {
      console.log("Password Doesn't Match...");
      showText("Password Doesn't Match. Make Sure The Updated Password Is Correct", "#825995")
      return;
    }

    const payload = {
      current_password: $scope.currentPassword,
      new_password: $scope.newPassword
    };

    $http.post(`${URL}/employee/updatePassword`, payload).then(function (res) {
      if (res.status !== 200) {
        showText("Something Went Wrong! Check Console");
        console.error(`Cannot Update Password: ${res.data['message']}`);
        return;
      }
      console.log("Password Updated Succesfully");
      showText("Password Updated Succesfully!");
    }).catch(function (err) {
      showText("Something Went Wrong! Check Console");
      console.error(`Cannot Update Password: ${err.data["error"]}`);
    })
  }
});
