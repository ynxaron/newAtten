// Getting and Storing Images From Backend server
newAtten.service("pictures", function ($http) {
  let URL = "http://localhost:8000";
  this.imgSrc = function() {
      return $http.get(`${URL}/employee/getpic`).then(function(response) {
        console.log(`Got Image for User, trying to cache it in`);
        try {
          sessionStorage.setItem("UserImg", response.data['image']);
        } catch (e) {
          console.warn(`Wasn't Able to cache the data in: ${e}`);
        }
        return response.data['image'];
      }, function(error) {
        console.warn(`Failed to get the data: ${error}. Trying Cache`);
        try {
          let image = sessionStorage.getItem("UserImg");
          if (image !== null) {
            return image;
          } else {
            console.error("Cache succeded, but was none");
            return null;
          }
        } catch (e) {
          console.error(`Cannot get Cached Value: ${e}`);
          return null;
        }
      })
    }


  this.loginPic = function() {
    return $http.get(`${URL}/employee/getDefaultPic`).then(function(res) {
      try {
        sessionStorage.setItem("loginPic", res.data['image']);
      } catch (e) {
        console.warn("Failed to Cache LoginPic...");
      }
      return res.data['image'];
    }, function(err) {
      console.warn(`Failed to retrieve DefaultPic, trying sessionStorage...\n${err}`);
      try {
        const defaultPic = sessionStorage.getItem("loginPic");
        if (defaultPic !== null) {
          return defaultPic;
        } else {
          console.error("loginPic in sessionStorage but is null...returning null");
          return null;
        }
      } catch (e) {
        console.error(`Failed to Retrieve from sessionStorage...${e}`);
      }
    })
  }

  this.djuboImg = function() {
      return $http.get(`${URL}/employee/getDjuboImg`).then(function(res) {
        try {
          sessionStorage.setItem("djuboPic", res.data['image']);
        } catch (e) {
          console.warn("Failed to Cache djuboPic...");
        }
        return res.data['image'];
      }, function(err) {
        console.warn(`Failed to retrieve djuboPic, trying sessionStorage...\n${err}`);
        try {
          const defaultPic = sessionStorage.getItem("djuboPic");
          if (defaultPic !== null) {
            return defaultPic;
          } else {
            console.error("djuboPic in sessionStorage but is null...returning null");
            return null;
          }
        } catch (e) {
          console.error(`Failed to Retrieve from sessionStorage...${e}`);
        }
      })
    }
});
