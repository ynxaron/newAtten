$(() => {
  // BEGIN: Adjusting Sidebar
  const $sidebar = $("#sidebar");
  const $mainContent = $(".col.p-4");

  // Initial hidden state
  $sidebar.css({
    transform: "translateX(-100%)",
    transition: "transform 0.3s ease",
    position: "fixed",
  });

  $mainContent.css({
    marginLeft: "0",
    transition: "margin-left 0.3s ease",
  });

  // Hover detection area (invisible box on left edge)
  const $hoverArea = $("<div></div>")
    .css({
      position: "fixed",
      top: 0,
      left: 0,
      width: "20px",
      height: "100vh",
      zIndex: 1050, // higher than sidebar
    })
    .appendTo("body");

  $hoverArea.on("mouseenter", () => {
    $sidebar.css("transform", "translateX(0)");
    $mainContent.css("margin-left", "260px");
  });

  // When mouse leaves sidebar, hide it again
  $sidebar.on("mouseleave", () => {
    $sidebar.css("transform", "translateX(-100%)");
    $mainContent.css("margin-left", "0");
    sidebarVisible = false;
  });

  let checkinTime;
  let checkoutTime;
  let breaksArray = [];

  // Utility to format Date as "HH:MM"
  function formatTime(date) {
    return (
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0")
    );
  }

  $.getJSON("data/user_info.json", function (data) {
    if (data.username) {
      $("#username-display").text(data.username);
    } else {
      console.error("There was an error displaying the user name");
    }
  });

  // User Utility Function

  function showText(message) {
    const textElement = $(`
        <div class="text-white p-3 rounded shadow text-center mb-2"
             style="background-color: #825995;
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 2000;
                    min-width: 250px;">
          ${message}
        </div>
      `);
    $("body").append(textElement);

    setTimeout(() => {
      textElement.fadeOut(400, function () {
        $(this).remove();
      });
    }, 1000);
  }
  // Utility to calculate duration in "HH:MM"
  function calculateDuration(start, end) {
    const diffMs = end - start;
    const totalMins = Math.floor(diffMs / 60000);
    const hours = Math.floor(totalMins / 60)
      .toString()
      .padStart(2, "0");
    const mins = (totalMins % 60).toString().padStart(2, "0");
    return `${hours}:${mins}`;
  }

  // Check In
  $("#checkin-btn").click(function () {
    checkinTime = new Date();
    breaksArray = []; // Reset for new session
    console.log("Checked in at:", formatTime(checkinTime));
    showText("YOU ARE LOGGED IN!");
  });

  // Break
  $("#break-btn").click(function () {
    const breakTime = new Date();
    breaksArray.push(formatTime(breakTime));
    console.log("Break at:", formatTime(breakTime));
    showText("BREAK BEGINS @" + formatTime(breakTime));
  });

  // Check Out
  //
  $("#checkout-btn").click(function () {
    checkoutTime = new Date();

    const sessionData = {
      checkin: formatTime(checkinTime),
      breaks: breaksArray,
      checkout: formatTime(checkoutTime),
      duration: calculateDuration(checkinTime, checkoutTime),
    };

    localStorage.setItem("userSession", JSON.stringify(sessionData));
    console.log("Session saved:", sessionData);
    showText("YOU CHECKOUT OUT! ENJOY YOUR DAY OFF!!");
  });
  // END: Making it so that checkin and checkout time is stored
});
