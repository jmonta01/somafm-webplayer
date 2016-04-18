'use strict';

angular.module('somafmPlayerApp')
  .directive("sfCommunityTwitterView", [
    '$sce',
    function ($sce) {
      return {
        restrict :"E",
        replace: true,
        scope: {},
        templateUrl: 'community/views/twitter.tpl.html',
        link: function (scope, element, attr) {

          scope.src = $sce.trustAsResourceUrl('http://somafm.com/app/twitter.html');


        }
      }
    }
  ]);
