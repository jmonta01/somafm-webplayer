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
          //element.append('<iframe src="http://somafm.com/app/facebook.html"></iframe>');

          var showWidget = function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5";
            fjs.parentNode.insertBefore(js, fjs);
          };
          showWidget(document, 'script', 'facebook-jssdk');
        }
      }
    }
  ]);
