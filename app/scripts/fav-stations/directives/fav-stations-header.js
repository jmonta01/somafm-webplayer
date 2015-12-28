'use strict';

angular.module('somafmPlayerApp')
  .directive("sfFavStationsHeader", [
    function () {
      return {
        restrict :"E",
        replace: true,
        scope: {},
        templateUrl: 'fav-stations/header.tpl.html',
        link: function (scope, element, attr) {
        }
      }
    }
  ]);
