$(() => {
  // BEGIN: PEERS WATCH LIST (through jquery)
  // defining the team data here, later can make this array into a parsed db request
  $.getJSON("data/onlines.json", (data) => {
    let teamInfo = data;

    // This function would iterate over all the items in data/onlines.json and for each
    // member found, create two divs. One would contain the profile overviews, and the other
    // would contain another overview that would happen only when you click on the profile.
    _.each(teamInfo, (member, index) => {
      const statusOnline = member.online ? "text-success" : "text-secondary";

      let person_overview = `
        <div
          class="d-flex flex-column position-absolute border bg-white border-white shadow-lg p-3 w-50 shadow-lg"
          id="person-${index}-overview"
          style="opacity:0; z-index:9999; transition: opacity 0.3s; border-radius: 12px"
        >
          <!-- Top section: Status icon, profile image, and name -->
          <div class="d-flex justify-content-between align-items-center mb-3">

            <!-- Profile image -->
            <div class="mb-3">
            <img
              src="${member.photo}"
              alt="Profile Photo"
              class="rounded-circle me-3"
              style="width: 90px; height: 90px; object-fit: cover"
            />

            <!-- Name -->
            <strong class="h3 fw-bold">${member.name}</strong>
            </div>

            <!-- Status icon -->
            <i
              id="person-${index}-status"
              class="fas fa-circle me-3 ${member.online ? "text-success" : "text-secondary"}"
              style="font-size: 0.75rem;"
            ></i>
          </div>

          <!-- Icon section -->
          <div class="d-flex justify-content-around mb-1">
            <div><a><i class="fas fa-envelope"></i></a></div>
            <div><a><i class="fas fa-bell"></i></a></div>
            <div><a><i class="fas fa-phone"></i></a></div>
          </div>
        </div>`;

      let card = `<div class="col position-relative z-2">
                              <div class="d-flex align-items-center p-4">
                                <button class="btn btn-white border-white" id="online-profile-${index}-btn">
                                ${person_overview}
                                  <img src="${member.photo}"
                                      class="rounded-circle me-4"
                                      width="100"
                                      height="100"
                                      alt="Profile"
                                />
                                </button>
                                <div class="flex-grow-1">
                                  <h4 class="fw-bold mb-1">${member.name}</h4>
                                  <div class="text-muted mb-2 fw-semibold">${member.title}</div>
                                  <div class="fw-medium">
                                    ${member.update}
                                  </div>
                                </div>
                                <i class="fas fa-circle ${statusOnline} ms-3 fs-4"></i>
                              </div>
                          </div>`;

      $("#teamOverview").append(card);
    });
  });

  // Adding interactivity to the online profile button

  // The way this function works is first it defines a variable
  let toggleFriendsOverview = false; // <---- this variable
  // which would check if our profile view is toggled or not.

  // In the function then we check first whether the event if 'click', and is on
  // entities (I don't know what to call them, never learned it)
  $("#teamOverview").on("click", "button", function () {
    const button_id = $(this).attr("id"); // then we get the id value of the element choosen
    const id_num = Number(button_id.split("-")[2]); // then we get the id using split
    // we log for debugging purposes
    console.log("You Clicked On " + id_num + "th button");
    // we then use this toggleFriendsOverview variable, checking if it is true
    // (friends overview is visible), make the div with this id
    // (gotten by adding the id_num into another pattern), and changing css
    if (toggleFriendsOverview) {
      $(`#person-${id_num}-overview`).css("opacity", 0);
      // $(`#person-${id_num}-overview).fadeIn();
    } else {
      $(`#person-${id_num}-overview`).css("opacity", 1);
      // $(`#person-${id_num}-overview).fadeOut();
    }
    // then we XOR toggleFriendsOverview with itself and 1, flipping the value
    toggleFriendsOverview ^= 1;
  });

  // END: PEERS WATCH LIST (through jquery)
  // BEGIN: PROFILE OVERVIEW CHARTS
  let hours_metric = $("#Hours-Metric");
  let features_ticked = $("#Feature-Ticked");
  let code_evaluation = $("#Code-Evaluation");

  new Chart(hours_metric, {
    type: "doughnut",
    data: {
      labels: ["Hours Logged", "Expected"],
      datasets: [
        {
          data: [180, 70],
          backgroundColor: ["#825995", "#e0e0e0"],
          borderWidth: 0,
        },
      ],
    },

    options: {
      plugins: {
        legend: {
          labels: {
            font: {
              size: 18,
              weight: "bold",
            },
            color: "#808080",
          },
        },
      },
    },
  });

  new Chart(features_ticked, {
    type: "doughnut",
    data: {
      labels: ["Tickets Achieved", "Remaining"],
      datasets: [
        {
          data: [9, 1],
          backgroundColor: ["#4ca3af", "#e0e0e0"],
          borderWidth: 0,
        },
      ],
    },

    options: {
      plugins: {
        legend: {
          labels: {
            font: {
              size: 18,
              weight: "bold",
            },
            color: "#808080",
          },
        },
      },
    },
  });

  new Chart(code_evaluation, {
    type: "doughnut",
    data: {
      labels: ["Code Reviews", "Remaining"],
      datasets: [
        {
          data: [9, 7],
          backgroundColor: ["#825995", "#e0e0e0"],
          borderWidth: 0,
        },
      ],
    },

    options: {
      plugins: {
        legend: {
          labels: {
            font: {
              size: 18,
              weight: "bold",
            },
            color: "#808080",
          },
        },
      },
    },
  });

  // END: PROFILE OVERVIEW CHARTS
  //
  //

  // BEGIN: CALENDAR VIEW
  const allDays = moment.weekdaysShort();
  const weekDays = allDays.filter((day) => !["Sun", "Sat"].includes(day));
  const workHours = [
    0, 2, 5, 6, 4, 8, 7, 9, 3, 1, 0, 5, 8, 6, 7, 2, 4, 6, 9, 10, 8, 5, 3, 1, 0,
    7, 9, 6, 4, 2,
  ];

  const $calendar = $("#work-hours-calendar");

  $.each(workHours, function (index, hours) {
    const lightness = 100 - hours * 7;
    const dayNum = index + 1;
    const weekday = weekDays[index % 7];

    // Creating The Div To Be Injected: BEGIN
    const $box = $("<div></div>", {
      class: "day-box",
      css: {
        backgroundColor: `hsl(270, 60%, ${lightness}%)`,
        color: lightness > 75 ? "#333" : "#fff",
        position: "relative", // needed for absolute children
        padding: "12px",
        textAlign: "center",
        fontWeight: "bold",
      },
    });

    const $dayNum = $("<div></div>", {
      text: dayNum,
      css: {
        fontSize: "24px",
        marginBottom: "8px",
      },
    });

    const $weekday = $("<div></div>", {
      text: weekday,
      css: {
        fontSize: "12px",
        position: "absolute",
        bottom: "4px",
        right: "6px",
      },
    });

    $box.append($dayNum).append($weekday);
    $calendar.append($box);
    // Creating a day-box to be rejected: END
  });

  // Changing The Colors When Hovered: Begin
  $("#box-container").on("mouseenter", () => {
    $(this).css({ "background-color": "black", color: "white" });
  });
  // Changing The Colots When Hovered: End

  // END: CALENDAR VIEW

  // BEGIN: WEEK WORK VIEW
  new Chart($("#barChart"), {
    type: "bar",
    data: {
      labels: weekDays,
      datasets: [
        {
          label: "HOURS",
          data: [5, 7, 4, 7, 5],
          backgroundColor: "rgba(124, 86, 247, 0.7)",
        },
      ],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } },
    },
  });

  // END: WEEK WORK VIEW

  // BEGIN: MONTH WORK VIEW
  new Chart($("#lineChart"), {
    type: "line",
    data: {
      labels: moment.monthsShort(),
      datasets: [
        {
          label: "HOURS",
          data: [51, 40, 40, 52, 45, 39, 54, 40, 39, 50, 30, 25],
          backgroundColor: "rgba(124, 86, 247, 0.2)",
          borderColor: "rgba(124, 86, 247, 1)",
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } },
    },
  });
  // END: MONTH WORK VIEW
  // BEGIN:
});
