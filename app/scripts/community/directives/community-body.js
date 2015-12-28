'use strict';

angular.module('somafmPlayerApp')
  .directive("sfCommunityBody", [
    function () {
      return {
        restrict :"E",
        replace: true,
        scope: {},
        templateUrl: 'community/body.tpl.html',
        link: function (scope, element, attr) {
        }
      }
    }
  ]);
