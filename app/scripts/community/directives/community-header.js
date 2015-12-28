'use strict';

angular.module('somafmPlayerApp')
  .directive("sfCommunityHeader", [
    function () {
      return {
        restrict :"E",
        replace: true,
        scope: {},
        templateUrl: 'community/header.tpl.html',
        link: function (scope, element, attr) {
        }
      }
    }
  ]);
