'use strict';

angular.module('somafmPlayerApp')
  .directive("list", ["$window", "$timeout", "$rootScope",
    function ($window, $timeout, $rootScope) {
      return {
        restrict :"E",
        replace: true,
        scope: {},
        transclude: true,
        template:   "<div id='list' class='list' ng-transclude></div>",
        link: function (scope, element, attr) {

          scope.updateLayout = function () {

            var children = element.parent().children();
            var list = angular.element(document.getElementById("list"));
            var availHeight = $rootScope.viewStackHeight;

            angular.forEach(children, function (child) {
              if (child.id != "list") {
                availHeight -= child.offsetHeight;
              }
            });

            list.css("height", availHeight + "px");
          };

          angular.element($window).bind( "resize", function () {
            scope.updateLayout();
          });

          $timeout(scope.updateLayout, 100);
        }
      }
    }
  ]);
