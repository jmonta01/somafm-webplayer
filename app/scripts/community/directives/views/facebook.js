'use strict';

angular.module('somafmPlayerApp')
  .directive("sfCommunityFacebookView", [
    '$timeout', 'CommunityService',
    function ($timeout, CommunityService) {
      return {
        restrict :"E",
        replace: true,
        scope: {},
        templateUrl: 'community/views/facebook.tpl.html',
        link: function (scope, element, attr) {
          element.append('<iframe src="http://somafm.com/app/facebook.html"></iframe>');
        }
      }
    }
  ]);
