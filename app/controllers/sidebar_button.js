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

  // BEGIN: Check-In, Breaks, & CheckOut Logic
  let checkedIn = false;
  let checkedOut = false;
  $("#checkin-btn").click(function () {
    checkinTime = moment();
    breaksArray = []; // Resets for a new session
    checkedIn = true;
    console.log("Checked in at:", checkinTime.format("HH:MM"));
    showText("YOU ARE LOGGED IN!");
  });

  // Break
  $("#break-btn").click(function () {
    if (!checkedIn) {
      showText("Check In Before You Take Breaks!");
      return;
    } else if (checkedOut) {
      showText("You Have Already Checked Out");
      return;
    }
    const breakTime = moment().format("HH:MM");
    breaksArray.push(breakTime);
    console.log("Break at:", breakTime);
    showText("BREAK BEGINS @" + breakTime);
  });

  // Check Out
  //
  $("#checkout-btn").click(function () {
    if (!checkinTime) {
      showText("Check In Before you Check Out!");
      return;
    }

    checkoutTime = moment();
    const sessionData = {
      checkin: checkinTime.format("HH:MM"),
      breaks: breaksArray,
      checkout: checkoutTime.format("HH:MM"),
      duration: Math.round(checkoutTime.diff(checkinTime, "minutes") / 60),
    };

    localStorage.setItem("userSession", JSON.stringify(sessionData));
    console.log("Session saved:", sessionData);
    checkedOut = true;
    showText("YOU CHECKOUT OUT! ENJOY YOUR DAY OFF!!");
  });
  // END: Making it so that checkin and checkout time is stored
});
