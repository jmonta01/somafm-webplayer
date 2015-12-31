'use strict';

angular.module('somafmPlayerApp')
  .directive("sfBody", [
    'PlayerService',
    function (PlayerService) {
      return {
        restrict :"E",
        replace: true,
        scope: {
          config: '='
        },
        templateUrl: 'common/body.tpl.html',
        link: function (scope, element, attr) {}
      }
    }
  ]);
