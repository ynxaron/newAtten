newAtten.controller("loginController", function ($scope) {
  localStorage.setItem("loggedIn", false);
  $scope.login = function () {
    const useremail = $scope.useremail;
    const password = $scope.password;

    if (useremail === "user" && password == "1234") {
      localStorage.setItem("loggedIn", true);
      window.location.href = "#!/dashboard";
    } else {
      showText("Wrong Username or Passwd");
    }
  };
});
