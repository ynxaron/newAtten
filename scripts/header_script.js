$(() => {
  function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const timeString = `${hours}:${minutes}`;
    $("#current-time").text(timeString);
  }

  // Call once immediately
  updateTime();

  // Optional: update every minute
  setInterval(updateTime, 60000);
  $.getJSON("data/user_info.json", function (data) {
    if (data.username) {
      $("#username").text("Hello, " + data.username);
    }
  }).fail(function () {
    console.log("ERROR ASSIGNING USER VALUE");
  });
});
