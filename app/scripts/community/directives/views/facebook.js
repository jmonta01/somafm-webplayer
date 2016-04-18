'use strict';

angular.module('somafmPlayerApp')
  .directive("sfCommunityFacebookView", [
    '$sce', 'CommunityService',
    function ($sce, CommunityService) {
      return {
        restrict :"E",
        replace: true,
        scope: {},
        templateUrl: 'community/views/facebook.tpl.html',
        link: function (scope, element, attr) {

          scope.src = $sce.trustAsResourceUrl('http://somafm.com/app/facebook.html');

        }
      }
    }
  ]);
