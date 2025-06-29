// Here we are defining a directive that would send a single calendar box (made of
// day and date) that would be later used inside a grid with ng-repeat. The class
// 'day-box' is defined inside app/styles/main-style.css
angular.module("newAtten").directive("dayBox", function () {
  return {
    restrict: "E",
    scope: {
      props: "=",
    },
    template: `
      <div class="day-box" ng-style="style">
        <div style="font-size: 24px; margin-bottom: 8px;">{{props.dayNum}}</div>
        <div style="font-size: 12px; position: absolute; bottom: 4px; right: 6px;">{{props.weekDay}}</div>
      </div>
    `,
    link: function (scope) {
      // here we are multiplying by 7 because each day the working hours do not range
      // from 0 to 100 but only 0-10, hence limiting the color options.
      const lightness = 100 - scope.props.hours * 7;
      scope.style = {
        backgroundColor: `hsl(270, 60%, ${lightness}%)`,
        color: lightness > 75 ? "#333" : "#fff",
        position: "relative",
        padding: "12px",
        textAlign: "center",
        fontWeight: "bold",
      };
      console.log("Hello");
    },
  };
});
