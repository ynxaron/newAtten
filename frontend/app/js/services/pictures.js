newAtten.service("pictures", function ($http) {
  let BASE_URL = "assets";
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

  this.djuboImg = function () {
    return `${BASE_URL}/djubo-cropped.png`;
  };
  this.loginPic = function () {
    return `${BASE_URL}/login-pic.jpeg`;
  };
});
