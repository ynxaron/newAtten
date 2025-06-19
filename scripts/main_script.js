$(() => {
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
          label: "Students",
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
          label: "Attendance",
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
