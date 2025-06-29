function setupDashboardUI(chartsInfo) {
  let toggleFriendsOverview = false; // <---- this variable
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
          data: chartsInfo.tickets_archived,
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
  const weekDays = allDays.slice(1, -1);

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
