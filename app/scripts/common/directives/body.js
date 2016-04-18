'use strict';

angular.module('somafmPlayerApp')
  .directive("sfBody", [
    function () {
      return {
        restrict :"E",
        replace: true,
        scope: {
          largeHeader: '=',
          selectedStation: '='
        },
        templateUrl: 'common/body.tpl.html',
        link: function (scope, element, attr) {
        }
      }
    }
  ]);
