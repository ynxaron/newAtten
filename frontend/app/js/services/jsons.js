newAtten.service("jsons", function ($http, $q) {
  let BASE_URL = "app/data";
  function fetchJson(key, path) {
    return $q(function (resolve, reject) {
      $http
        .get(path)
        .then(function (response) {
          try {
            localStorage.setItem(key, JSON.stringify(response.data));
          } catch {
            console.warn("Could Not Cache in LocalStorage: " + key);
          }
          resolve(response.data);
        })
        .catch(function (error) {
          console.warn(
            "Failed to fetch " + path + "from Server. Trying Local Storage...",
          );
          try {
            const cached = localStorage.getItem(key);
            if (cached) {
              resolve(JSON.parse(cached));
            } else {
              reject("Failed to load or parse cached data for: " + key);
            }
          } catch (e) {
            reject("Failed to load cached value for: " + key);
          }
        });
    });
  }

  this.emp_info = function () {
    return fetchJson("emp-info", `${BASE_URL}/employee_info.json`);
  };
  this.onlines = function () {
    return fetchJson("onlines", `${BASE_URL}/onlines.json`);
  };
  this.user_info = function () {
    return fetchJson("user-info", `${BASE_URL}/user_info.json`);
  };
  this.user_session = function () {
    return fetchJson("thisuser_data", `${BASE_URL}/thisuser_data.json`);
  };

  this.thisuser_data = function () {
    return fetchJson("thisuser_data", `${BASE_URL}/thisuser_data.json`);
  };
});
