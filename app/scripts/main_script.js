function setupDashboardUI(onlineSrc, chartsInfo) {
  // BEGIN: PEERS WATCH LIST (through jquery)
  // defining the team data here, later can make this array into a parsed db request
  $.getJSON(onlineSrc, (data) => {
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
            <div class="mb-4">
              <img
                src="${member.photo}"
                alt="Profile Photo"
                class="rounded-circle me-2"
                style="width: 70px; height: 70px; object-fit: cover"
                />

            <!-- Name -->
              <strong class="h4 fw-bold">${member.name.split(" ")[0]}</strong>
              <small class="ms-2 mb-3 text-muted">${member.title}</small>
            </div>

            <!-- Status icon -->
            <div class="mb-4">
              <a id="person-${index}-status">
                <i
                  class="fas fa-circle me-3 ${member.online ? "text-success" : "text-secondary"}"
                  style="font-size: 0.75rem;"
                ></i>
              </a>
            </div>
          </div>

          <!-- Icon section -->
          <div class="d-flex justify-content-around mb-1" id="button-overview-${index}">
            <div><a id="button-${index}-envelope"><i class="fas fa-envelope"></i></a></div>
            <div><a id="button-${index}-bell"><i class="fas fa-bell"></i></a></div>
            <div><a id="button-${index}-phone"><i class="fas fa-phone"></i></a></div>
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

  // Adding the interactivity for buttons (making them change colors for a bit)
  // this would be changing the buttons inside the person_overview blue, before Changing
  // to default black. This would only select
  $("#button-overview").on("click", "button", function () {
    $(this).addClass("bg-light");
    setTimeout(() => {
      $(this).removeClass("bg-light");
    }, 500);
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
          data: chartsInfo.hours_logged,
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
          data: chartsInfo.tickets_archieved,
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
          data: chartsInfo.code_evaluated,
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

  // BEGIN: CALENDAR VIEW
  const allDays = moment.weekdaysShort();
  const weekDays = allDays.filter((day) => !["Sun", "Sat"].includes(day));
  const workHours = chartsInfo.work_hours;

  const $calendar = $("#work-hours-calendar");

  $.each(workHours, function (index, hours) {
    const lightness = 100 - hours * 7;
    const dayNum = index + 1;
    const weekday = weekDays[index % 7];

    // Creating The Div To Be Injected: BEGIN
    const $boxJQ = $("<div></div>", {
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

    const $dayNumJQ = $("<div></div>", {
      text: dayNum,
      css: {
        fontSize: "24px",
        marginBottom: "8px",
      },
    });

    const $weekdayJQ = $("<div></div>", {
      text: weekday,
      css: {
        fontSize: "12px",
        position: "absolute",
        bottom: "4px",
        right: "6px",
      },
    });

    $boxJQ.append($dayNumJQ).append($weekdayJQ);
    $calendar.append($boxJQ);
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
          data: chartsInfo.week_work_info,
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
          data: chartsInfo.month_work_info,
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
}
