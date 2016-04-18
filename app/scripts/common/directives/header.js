'use strict';

angular.module('somafmPlayerApp')
  .directive("sfHeader", [
    function () {
      return {
        restrict :"E",
        replace: true,
        scope: {
          largeHeader: '='
        },
        templateUrl: 'common/header.tpl.html',
        link: function (scope, element, attr) {
        }
      }
    }
  ]);
