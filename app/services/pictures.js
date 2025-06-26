newAtten.service("pictures", function () {
  this.imgSrc = function (name) {
    if (!name) {
      return "assets/default-img.png";
    }

    return `assets/'${name}'.png`;
  };
  this.djuboImg = function () {
    return "assets/djubo-cropped.png";
  };
});
