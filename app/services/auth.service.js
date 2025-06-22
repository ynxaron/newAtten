angular.module("attendanceApp").factory("AuthService", function () {
  let isLoggedIn = false;

  return {
    login(email, password) {
      isLoggedIn = email === "satyam.prakash@djubo.com" && password === "1234";
      return isLoggedIn;
    },
    isLoggedIn() {
      return isLoggedIn;
    },
    logout() {
      isLoggedIn = false;
    },
  };
});
