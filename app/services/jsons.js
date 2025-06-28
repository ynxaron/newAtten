newAtten.service("jsons", function () {
  this.emp_info = function () {
    return "app/data/employee_info.json";
  };
  this.onlines = function () {
    return "app/data/onlines.json";
  };
  this.user_info = function () {
    return "app/data/user_info.json";
  };
  this.user_session = function () {
    return "app/data/user_session.json";
  };
  this.thisuser_data = function () {
    return "app/data/thisuser_data.json";
  };
  this.usersession_info = function () {
    return "app/data/usersession_info.json";
  };
});
