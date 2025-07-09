newAtten.controller("loginController", function ($scope, $http, pictures) {
  localStorage.setItem("loggedIn", "false");
  localStorage.setItem("adminLoggedIn", "false");
  $scope.loginPic = pictures.loginPic();
  $scope.login = function () {
    const useremail = $scope.useremail;
    const password = $scope.password;

    $http.post("http://localhost:8000/employee/login/", {
      "email": "satyam.prakash@djubo.com",
      "password": "1234"
    }).then(function(response) {
      console.log(response.data)
      if (response.data.is_admin) {
        console.log("IS ADMIN")
        localStorage.setItem("adminLoggedIn", "true");
        window.location.href = "#!/admin"
      }
      else if (response.data.is_user) {
        console.log("LOGGED IN")
        localStorage.setItem("loggedIn", "true");
        window.location.href = "#!/dashboard";
      } else {
        console.log("NOT ALLOWED")
        showText("Wrong Username or Password. Please Try Again")
      }
    })
  };
});
