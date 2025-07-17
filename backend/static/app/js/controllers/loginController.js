newAtten.controller("loginController", function ($scope, $http, pictures) {
  localStorage.setItem("loggedIn", "false");
  localStorage.setItem("adminLoggedIn", "false");
  //$scope.loginPic = pictures.loginPic();
  pictures.loginPic().then(function (img) {
    $scope.loginPic = img;
  })
  $scope.login = function () {
    const useremail = $scope.useremail;
    const password = $scope.password;

    $http.post("http://localhost:8000/employee/login", {
      "email": useremail,
      "password": password,
    }).then(function(response) {
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
        console.error("Error While Logging...");
        showText("Wrong Username or Password. Please Try Again")
      }
    }).catch(function(err) {
      console.error(`Error Loggin In\n${err.data}`)
      showText("Wrong Username or Password");
    })
  };
});
