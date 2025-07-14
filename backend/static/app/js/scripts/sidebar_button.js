function sidebarUI() {
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
    // We would change the css of sidebar, moving it till it is no longer moved -100%
    // and we would change the margin of our main_content, moving it equally right ways
    $sidebar.css("transform", "translateX(0)");
    $mainContent.css("margin-left", "260px");
  });

  // When mouse leaves sidebar, hide it again
  $sidebar.on("mouseleave", () => {
    // we are doing the exact opposite here,
    $sidebar.css("transform", "translateX(-100%)");
    $mainContent.css("margin-left", "0");
  });

  let checkinTime;
  let checkoutTime;

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

    checkinTime = moment().format("HH:mm");

    checkedIn = true;
    checkedOut = false;

    console.log("Checked in at:", checkinTime);
    showText("YOU ARE LOGGED IN!");
  });

  // Break
  // BEGIN: Defining the response to button pressing
  // In this function we would be defining the text pop-up behavior
  // as dependent on the strong subtag of the <a> tag
  let break_begin = null;
  let break_end = null;
  let break_array = [];
  $("#break-btn").click(function () {
    if (!checkedIn) {
      showText("Check In Before You Take Breaks!");
      return;
    } else if (checkedOut) {
      showText("You Have Already Checked Out");
      return;
    }
    // Here we are reversing the actual order because when you click
    // the break button, before JQuery can run Angularjs has already
    // changed the text of strong from BREAK to RESUME, hence why
    if ($("#break-btn strong").text() == "BREAK") {
      // Updating Breaks
      break_end = moment().format("HH:mm");
      break_array.push(break_begin);
      break_array.push(break_end);
      // Showing Text
      showText("RESUMED @" + moment().format("HH:mm"));
      console.log("RESUMED @" + moment().format("HH:mm"));
    } else if ($("#break-btn strong").text() == "RESUME") {
      break_begin = moment().format("HH:mm");
      showText("BREAK @" + moment());
      console.log("BREAK @" + moment());
    }
  });
  // END: Defining the response to button pressing

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

    checkedIn = false;
    checkedOut = true;
    checkoutTime = moment().format("HH:mm");

    showText("YOU CHECKOUT OUT! ENJOY REST OF YOUR DAY");
  });
  // END: Making it so that checkin and checkout time is stored
  return {
    "checkInTime": checkinTime,
    "checkOutTime": checkoutTime,
    "breaks": break_array
  }
}
