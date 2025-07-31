angular.module("newAtten").directive("collegueView", function () {
  return {
    restrict: "E",
    scope: {
      props: "=",
    },
    template: `
      <div class="col position-relative z-2">
        <div class="d-flex align-items-center flex-wrap p-4">
          <button
            class="btn btn-white border-white"
            role="button"
            tabindex="0"
            ng-attr-id="online-profile-{{props.index}}-btn"
          >
            <!-- BEGIN: Defining Hover Cards -->
            <div
              class="d-flex flex-column position-absolute border bg-white border-white shadow-lg p-3 w-50"
              ng-attr-id="person-{{props.index}}-overview"
              ng-style="{
                opacity: 0,
                zIndex: 9999,
                transition: 'opacity 0.3s',
                borderRadius: '12px'
              }"
            >
              <!-- Top section: Status icon, profile image, and name -->
              <div class="d-flex justify-content-between align-items-center mb-3">
                <!-- Profile image and name -->
                <div class="mb-4">
                  <img
                    ng-src="{{props.photo}}"
                    alt="Profile Photo"
                    class="rounded-circle me-2"
                    style="width: 70px; height: 70px; object-fit: cover"
                  />
                  <strong class="h4 fw-bold">{{props.firstName}}</strong>
                  <small class="ms-2 mb-3 text-muted">{{props.title}}</small>
                </div>
                <!-- Status icon -->
                <div class="mb-4">
                  <a ng-attr-id="person-{{props.index}}-status">
                    <i
                      class="{{props.onlineStatusIcon}}"
                      style="font-size: 0.75rem;"
                      ng-attr-id="onlineStatus-{{props.id}}"
                    ></i>
                  </a>
                </div>
              </div>

              <!-- Icon section -->
              <div
                class="d-flex justify-content-around mb-1"
                ng-attr-id="button-overview-{{props.index}}"
              >
                <div>
                  <!--Here For Future Use, when we would add button functionalities from here-->
                  <a ng-attr-id="button-{{props.index}}-envelope"><i class="fas fa-envelope"></i></a>
                </div>
                <div>
                  <a ng-attr-id="button-{{props.index}}-bell"><i class="fas fa-bell"></i></a>
                </div>
                <div>
                  <a ng-attr-id="button-{{props.index}}-phone"><i class="fas fa-phone"></i></a>
                </div>
              </div>
            </div>
            <!-- END: Defining Hover Cards -->

            <img
              ng-src="{{props.photo}}"
              class="rounded-circle me-4"
              width="100"
              height="100"
              alt="Profile"
            />
          </button>

          <div class="flex-grow-1">
            <h4 class="fw-bold mb-1">{{props.name}}</h4>
            <div class="text-muted mb-2 fw-semibold">{{props.title}}</div>
            <div class="fw-medium">{{props.update}}</div>
          </div>

          <i class="{{props.onlineStatusIcon}} ms-3 fs-4"></i>
        </div>
      </div>
    `,
    link: function(scope) {
      console.log(`${scope.props.name} Id = ${scope.props.id}`);
    }
  }
});
