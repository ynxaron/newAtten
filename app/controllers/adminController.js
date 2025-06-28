newAtten.controller("adminController", function ($scope, $http) {
  // First of all, we collect all the names in an employeeNames (needed for dropdown)
  // BEGIN: Collecting All Names
  $scope.employeeNames = [];
  //$scope.changeUser = function () {} This is for calling when changed
  $scope.nameChoosen = "Satyam Prakash";
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

      // BEGIN: Defining the Charts That are available beside it
      new Chart(document.getElementById("Hours-Metric"), {
        type: "doughnut",
        data: {
          labels: ["Hours Logged", "Expected"],
          datasets: [
            {
              data: $scope.getAttr($scope.nameChoosen, "codeReviews"),
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

      new Chart(document.getElementById("Feature-Ticked"), {
        type: "doughnut",
        data: {
          labels: ["Tickets Achieved", "Remaining"],
          datasets: [
            {
              data: $scope.getAttr($scope.nameChoosen, "featuresTicked"),
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

      new Chart(document.getElementById("Code-Evaluation"), {
        type: "doughnut",
        data: {
          labels: ["Code Reviews", "Remaining"],
          datasets: [
            {
              data: $scope.getAttr($scope.nameChoosen, "codeEvaluation"),
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

      // BEGIN: Line Graph of Working Hours
      new Chart(document.getElementById("workinghours-graph"), {
        type: "line",
        data: {
          labels: moment.weekdaysShort().slice(1, -1),
          datasets: [
            {
              label: "HOURS",
              data: $scope.getAttr($scope.nameChoosen, "metrics")["hours"],
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

      // END: Line Graph of Working Hours
    })
    .catch(function () {
      console.log("Wasn't Able to Get values");
    });
  // END: Collecting All Names;
});
