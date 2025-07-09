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
  this.user_session = function () {
    return fetchJson("thisuser_data", `${BASE_URL}/thisuser_data.json`);
  };

  this.thisuser_data = function () {
    return fetchJson("thisuser_data", `${BASE_URL}/thisuser_data.json`);
  };

  // This function would use django to get all values instead
  this.user_info = function() {
    // Defining a helper function to get each attribute, and try both caching in case
    // it finds it, and trying localStorage in case in case it doesn't
    const getThis = function(attr) {
      return $http.get(`http://localhost:8000/employee/get/${attr}`).then(function(response) {
        try {
          localStorage.setItem(attr, JSON.stringify(response.data[attr]))
        } catch {
          console.error("Could Not Cache In LocalStorage: ", attr)
        }
        // returning the attribute as is configured the response.
        return response.data[attr];
      }, function(error) {
        console.warn("Failed to retrieve value, trying local storage...");
        try {
          let attrresp = localStorage.getItem(attr)
          if (attrresp !== null) {
            return JSON.parse(attrresp);
          } else {
            console.warn("LocalStorage is present, but value is Null. Returning Null");
            return null;
          }
        } catch {
          console.error("Failed To Read from LocalStorage: ", error);
          return null;
        }
      })
    }
    return $q.all({
      username: getThis("username"),
      userjob: getThis("job"),
      total_leaves_taken: getThis("total_leaves_taken"),
      total_leaves_left: getThis("total_leaves_left"),
      paid_overtime: getThis("paid_overtime"),
      total_absent: getThis("total_absent"),
    }).then(function(result) {
      return result;
    })
  };
})
