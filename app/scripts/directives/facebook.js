'use strict';

angular.module('somafmPlayerApp')
  .directive("facebook", ["$rootScope", 'CommunityService',
    function ($rootScope, CommunityService) {
      return {
        restrict :"E",
        replace: true,
        scope: {},
        template: "<div class='community facebook'></div>",
        link: function (scope, element, attr) {
          //append the iframe until we can get the full api integrated
          element.append("<iframe src='http://somafm.com/app/facebook.html'></iframe>");

          //source  http://somafm.com/app/facebook.html
          /*
           CommunityService.loadFacebook().then(
           function (response) {

           }
           );
           */
        }
      }
    }
  ]);
