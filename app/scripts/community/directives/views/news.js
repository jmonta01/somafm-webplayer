'use strict';

angular.module('somafmPlayerApp')
  .directive("sfCommunityNewsView", [
    '$sce', 'CommunityService',
    function ($sce, CommunityService) {
      return {
        restrict :"E",
        replace: true,
        scope: {},
        templateUrl: 'community/views/news.tpl.html',
        link: function (scope, element, attr) {

          scope.src = $sce.trustAsResourceUrl('http://somafm.com/app/news.html');

        }
      }
    }
  ]);
