'use strict';

angular.module('somafmPlayerApp')
  .directive("sfCommunityBody", [
    'AppURLs', 'CommunityService',
    function (AppURLs, CommunityService) {
      return {
        restrict :"E",
        replace: true,
        scope: {},
        templateUrl: 'community/body.tpl.html',
        link: function (scope, element, attr) {
          scope.views = AppURLs.community.sections;
          scope.selectedView = _.first(scope.views);
          scope.show = function (view) {
            scope.selectedView = view;
          };
        }
      }
    }
  ]);
