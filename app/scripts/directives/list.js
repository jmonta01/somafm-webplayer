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

            for (var i=0; i<children.length; i++) {
              var child = angular.element(children[i]);
              if (child.attr("id") != "list") {
                var mTop = Number(child.css("margin-top").replace("px", "")) || 0;
                var mBtm = Number(child.css("margin-bottom").replace("px", "")) || 0;

                var childHeight = parseInt(children[i].clientHeight);
                availHeight -= (childHeight + mTop + mBtm);
              }
            }
            list.css("height", availHeight + "px");
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
