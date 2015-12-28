'use strict';

angular.module('somafmPlayerApp')
  .directive("sfFavSongsHeader", [
    function () {
      return {
        restrict :"E",
        replace: true,
        scope: {},
        templateUrl: 'fav-songs/header.tpl.html',
        link: function (scope, element, attr) {
        }
      }
    }
  ]);
