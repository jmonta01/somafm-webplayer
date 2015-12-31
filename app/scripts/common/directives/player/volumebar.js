'use strict';

angular.module('somafmPlayerApp')
  .directive("sfVolumebar", [
    function () {
      return {
        restrict :"E",
        replace: true,
        scope: {
          value: "=",
          valueChange: "&"
        },
        templateUrl: 'common/player/volumebar.tpl.html',
        link: function (scope, element, attr) {
          var width,
            offset,
            scrubber = element.children().eq(1),
            dragging = false;

          scope.$watch('value', function (val) {
            scrubber.css("width", val / attr.max * 100 + "%");
          });

          element.on('mousedown', function (event) {
            dragging = true;
            width =  element[0].getBoundingClientRect().width;
            offset = element[0].getBoundingClientRect().left;
          });

          element.on('mouseup', function (event) {
            dragging = false;
            _calcScrubberWidth(event.pageX);
          });

          element.on('mousemove', function (event) {
            if (dragging) {
              _calcScrubberWidth(event.pageX);
            }
          });

          function _calcScrubberWidth (x) {
            var dif = x - offset;

            if (dif < 0) {
              dif = attr.min;
              scrubber.css("width", "0%");
              scope.value = attr.min;
            }
            else if (dif > width) {
              dif = attr.max;
              scrubber.css("width", "100%");
              scope.value = attr.max;
            }
            else {
              var per = dif / width;
              scrubber.css("width", per * 100 + "%");
              scope.value = per * attr.max;
            }

            scope.valueChange({val: scope.value});

            scope.$apply();
          }

        }
      }
    }
  ]);
