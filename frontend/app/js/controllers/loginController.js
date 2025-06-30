newAtten.controller("loginController", function ($scope, pictures) {
  localStorage.setItem("loggedIn", "false");
  localStorage.setItem("adminLoggedIn", "false");
  $scope.loginPic = pictures.loginPic();
  $scope.login = function () {
    const useremail = $scope.useremail;
    const password = $scope.password;

    if (useremail === "satyam.prakash@djubo.com" && password == "1234") {
      localStorage.setItem("loggedIn", true);
      window.location.href = "#!/dashboard";
    } else if (useremail == "admin@djubo.com" && password == "1234") {
      localStorage.setItem("adminLoggedIn", "true");
      window.location.href = "#!/admin";
    } else {
      showText("Wrong Username or Password", "#825995");
    }
  };
});
