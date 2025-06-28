newAtten.controller("adminController", function ($scope, $http) {
  // Checking if you can login or not (via predefined localStorage)
  if (localStorage.getItem("adminLoggedIn") === "false") {
    window.location.href = "/";
    return;
  }
  // First of all, we collect all the names in an employeeNames (needed for dropdown)
  // BEGIN: Collecting All Names
  $scope.employeeNames = [];
  $scope.nameChoosen = "Satyam Prakash";

  // BEGIN: Defining charts so that they can be updated via ng-change
  $scope.hoursChart = null;
  $scope.featureChart = null;
  $scope.codeChart = null;
  $scope.lineChart = null;
  // END: Defining charts so that they can be updated via ng-change

  $http
    .get("app/data/employee_info.json")
    .then(function (response) {
      console.log("We Got The Employee Value");
      $scope.employeeNames = response.data.map((person) => person.name);
      console.log("Data Found");

      // BEGIN: Defining This Fuction
      // Then we would define a function that would take two values, one is the name of the
      // employee, and the other the attribute you want from them. For example, if you want
      // img_src from employee "Satyam Prakash", then you say give("img_src", "Satyam Prakash")
      $scope.getAttr = function (name, attr) {
        let person = response.data.find((person) => person.name == name);
        if (person && person.hasOwnProperty(attr)) {
          return person[attr];
        }
        console.log(
          "The attr: " + attr + " for name " + name + " was not found",
        );
      };
      // END: Of the function that would let us dynamically use each attr
      // BEGIN: A function that would select that person which has the name matching from selected

      $scope.selectPerson = function () {
        $scope.personChoosen = response.data.find(
          (person) => person.name == $scope.nameChoosen,
        );

        // Destroy previous charts if they exist
        if ($scope.hoursChart) $scope.hoursChart.destroy();
        if ($scope.featureChart) $scope.featureChart.destroy();
        if ($scope.codeChart) $scope.codeChart.destroy();
        if ($scope.lineChart) $scope.lineChart.destroy();

        $scope.hoursChart = new Chart(document.getElementById("Hours-Metric"), {
          type: "doughnut",
          data: {
            labels: ["Hours Logged", "Expected"],
            datasets: [
              {
                data: $scope.personChoosen.codeReviews,
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

        $scope.featureChart = new Chart(
          document.getElementById("Feature-Ticked"),
          {
            type: "doughnut",
            data: {
              labels: ["Tickets Achieved", "Remaining"],
              datasets: [
                {
                  data: $scope.personChoosen.featuresTicked,
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
          },
        );

        $scope.codeChart = new Chart(
          document.getElementById("Code-Evaluation"),
          {
            type: "doughnut",
            data: {
              labels: ["Code Reviews", "Remaining"],
              datasets: [
                {
                  data: $scope.personChoosen.codeEvaluation,
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
          },
        );

        // BEGIN: Line Graph of Working Hours
        $scope.lineChart = new Chart(
          document.getElementById("workinghours-graph"),
          {
            type: "line",
            data: {
              labels: moment.monthsShort(),
              datasets: [
                {
                  label: "HOURS",
                  data: $scope.getAttr($scope.nameChoosen, "metrics")["months"],
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
          },
        );
      };
      // END: A function that would select that person which has the name matching from selected
    })
    .catch(function () {
      console.log("Wasn't Able to Get values");
    });
});
