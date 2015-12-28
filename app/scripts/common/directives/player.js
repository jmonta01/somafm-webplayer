'use strict';

angular.module('somafmPlayerApp')
  .directive("sfPlayer", [
    function () {
      return {
        restrict :"E",
        replace: true,
        scope: {
        },
        templateUrl: 'common/player.tpl.html',
        link: function (scope, element, attr) {
        }
      }
    }
  ]);
