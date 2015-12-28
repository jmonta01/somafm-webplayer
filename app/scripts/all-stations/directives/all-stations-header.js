'use strict';

angular.module('somafmPlayerApp')
  .directive("sfAllStationsHeader", [
    function () {
      return {
        restrict :"E",
        replace: true,
        scope: {},
        templateUrl: 'all-stations/header.tpl.html',
        link: function (scope, element, attr) {
        }
      }
    }
  ]);
