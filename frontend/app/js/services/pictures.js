let BASE_URL = "assets";
newAtten.service("pictures", function () {
  this.imgSrc = function (name) {
    if (!name) {
      return "assets/default-img.png";
      return `${BASE_URL}/default-img.png`;
    }

    return `${BASE_URL}/'${name}'.png`;
  };
  this.djuboImg = function () {
    return `${BASE_URL}/djubo-cropped.png`;
  };
  this.loginPic = function () {
    return `${BASE_URL}/login-pic.jpeg`;
  };
});
