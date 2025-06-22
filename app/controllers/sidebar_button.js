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

  $.getJSON("data/user_info.json", function (data) {
    if (data.username) {
      $("#username-display").text(data.username);
    } else {
      console.error("There was an error displaying the user name");
    }
  });

  // User Utility Function
  // This Utility Function Shows Any Text.
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

    // We are using the JQuery fadeOut() function, but first
    // initializing it after 1000ms, then fading it in 400ms.
    // This creates a smoother animation than had we used
    // either one alone
    setTimeout(() => {
      textElement.fadeOut(400, function () {
        $(this).remove();
      });
    }, 1000);
  }

  // BEGIN: Check-In, Breaks, & CheckOut Logic
  // These Variables Would define the complex logic of checkin in and checkin out
  let checkedIn = false;
  let checkedOut = true;
  // End of Variables Declration
  let breaksArray = [];
  $("#checkin-btn").click(function () {
    if (checkedIn) {
      showText("You Have Already Checked In!");
      return;
    }
    if (!checkedOut) {
      showText("You Have Not Checked Out Yet!");
      return;
    }
    checkinTime = moment();
    checkedIn = true;
    console.log("Checked in at:", checkinTime.format("HH:mm"));
    showText("YOU ARE LOGGED IN!");
  });

  // Break
  $("#break-btn").click(function () {
    if (!checkedIn) {
      showText("Check In Before You Take Breaks!");
      return;
    }

    if (checkedOut) {
      showText("You Have Already Checked Out");
      return;
    }
    const breakTime = moment().format("HH:mm");
    breaksArray.push(breakTime);
    console.log("Break at:", breakTime);
    showText("BREAK BEGINS @" + breakTime);
  });

  // Check Out
  //
  $("#checkout-btn").click(function () {
    if (!checkedIn) {
      showText("Check In Before you Check Out!");
      return;
    }

    if (checkedOut) {
      showText("You Have Already Checked Out!");
      return;
    }

    checkoutTime = moment();

    // This function is here to calculate the difference in time as hours
    function calculateWorkingTime(begin, end) {
      const totalMins = end.diff(begin, "minutes");
      const totalHours = totalMins / 60; // so that 330 mins would become 5 hr
      const remainingMins = totalMins % 60; // so that 330 mins % 60 would become 30
      return totalHours + remainingMins / 60; // the remainingMins / 60 would give us percent
    }

    const sessionData = {
      checkin: checkinTime.format("HH:mm"),
      breaks: breaksArray,
      checkout: checkoutTime.format("HH:mm"),
      duration: calculateWorkingTime(checkinTime, checkoutTime),
    };

    localStorage.setItem("userSession", JSON.stringify(sessionData));
    console.log("Session saved:", sessionData);
    checkedOut = true;
    showText("YOU CHECKOUT OUT! ENJOY REST OF YOUR DAY");
  });
  // END: Making it so that checkin and checkout time is stored
});
