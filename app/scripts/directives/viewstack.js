'use strict';

angular.module('somafmPlayerApp')
  .directive("viewstack", ["$window", "$timeout", "$rootScope",
    function ($window, $timeout, $rootScope) {
      return {
        restrict :"E",
        replace: true,
        scope: {},
        template:   "<div id='viewstack' class='viewstack container'' ui-view onload='updateLayout()'></div>",
        link: function (scope, element, attr) {

          scope.updateLayout = function () {
            var view = angular.element(document.getElementById("viewstack"));

            var winHeight = $window.innerHeight;
            var footerHeight = document.getElementById("footer").clientHeight;
            var newHeight = winHeight - footerHeight - 10;

            view.css("height", newHeight + "px");
            $rootScope.viewStackHeight = newHeight;
          };

          angular.element($window).bind( "resize", function () {
            scope.updateLayout();
          });

          $timeout(function () {
            scope.updateLayout();
          }, 300);

        }
      }
    }
  ]);
