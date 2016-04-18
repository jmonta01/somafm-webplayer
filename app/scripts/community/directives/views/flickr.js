'use strict';

angular.module('somafmPlayerApp')
  .directive("sfCommunityFlickrView", [
    '$sce', 'CommunityService',
    function ($sce, CommunityService) {
      return {
        restrict :"E",
        replace: true,
        scope: {},
        templateUrl: 'community/views/flickr.tpl.html',
        link: function (scope, element, attr) {

          scope.src = $sce.trustAsResourceUrl('http://somafm.com/app/flickr.html');

        }
      }
    }
  ]);
