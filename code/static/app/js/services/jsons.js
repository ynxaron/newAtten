newAtten.service("jsons", function ($http, $q) {
  // Defining a helper function to get each attribute, and try both caching in case
  // it finds it, and trying localStorage in case in case it doesn't
  const URL = 'http://localhost:8000';
  const getThis = function(attr) {
    return $http.get(`${URL}/employee/get/${attr}`).then(function(response) {
      try {
        localStorage.setItem(attr, JSON.stringify(response.data.attr))
      } catch {
        console.error("Could Not Cache In LocalStorage: ", attr)
      }
    // returning the attribute as is configured the response.
      return response.data.attr;
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

  const empInfo = function(id) {
    return $http.get(`${URL}/employee/overview/${id}`).then(function(response) {
     try {
       sessionStorage.setItem(`overview_${id}`, JSON.stringify(response.data));
     } catch {
       console.warn("Couldn't able to cache empInfo for ", id);
     }
     return response.data;
    }, function(error) {
      console.warn(`Wasn't Able to retrieve value\n${error.error}, trying sessionStorage...`);
      try {
        let empCached = JSON.parse(sessionStorage.getItem(`overview_${id}`));
        if (empCached !== null) {
          return empCached;
        } else {
          console.error("Cache Available for EmpOverivew, But is null");
          return $q.resolve(null);
        }
      } catch {
        console.error("wasn't able to retrieve cache value from sessionStorage");
        return $q.resolve(null);
      }
    })
  }

    this.onlines = function() {
      return $http.get(`${URL}/employee/allIds`).then(function(response) {
        console.log(`All Ids are: ${response.data}`)
        let results = [];
        for (let id of response.data) {
          results.push(empInfo(id));
        }
        return $q.all(results);
      }, function(error) {
        console.error("Wasn't able to get all names from endpoint employee/allnames", error);
      }
    )
  }

  this.thisuser_data = function() {
    return $q.all({
      codeReviews: getThis("codeReviews"),
      featuresTicked: getThis("featuresTicked"),
      codeEvaluation: getThis("codeEvaluation"),
      hours_by_day: getThis("hours_by_day"),
      hours_by_week: getThis("hours_by_week"),
      hours_by_month: getThis("hours_by_month"),
      hours_by_years: getThis("hours_by_years"),
    }).then(function (result) { return result; })
  }

  // This function would use django to get all values instead
  this.user_info = function() {
    return $q.all({
      username: getThis("username"),
      userjob: getThis("job"),
      skills: getThis("skills"),
      joined: getThis("joined"),
      total_leaves_taken: getThis("total_leaves_taken"),
      total_leaves_left: getThis("total_leaves_left"),
      paid_overtime: getThis("paid_overtime"),
      total_absent: getThis("total_absent"),
    }).then(function(result) {
      return result;
    })
  };

  this.adminViews = function() {
    return $http.get(`${URL}/employee/adminViewSet`, function(response) {
      try {
        console.log("Got AdminView, trying to cache the data");
        localStorage.setItem("adminView", response.data);
      } catch (e) {
        console.warn(`...BUT, Wasn't Able to Cache It: ${e}`)
      }
      return response.data;
    }, function(error) {
      console.warn("Wasn't able to retrieve data, trying localStorage");
      try {
        adminView = localStorage.getItem("adminView");
        if (adminView !== null) {
          return adminView;
        } else {
          console.error("...BUT, WAS NOT able to retrieve value. Returning None");
          return null;
        }
      } catch (e) {
        console.error("WAS NOT ABLE to retrieve value from localStorage. Returning None");
        return null;
      }
    })
  }
})
