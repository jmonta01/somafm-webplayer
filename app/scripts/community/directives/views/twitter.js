'use strict';

angular.module('somafmPlayerApp')
  .directive("sfCommunityTwitterView", [
    function () {
      return {
        restrict :"E",
        replace: true,
        scope: {},
        templateUrl: 'community/views/twitter.tpl.html',
        link: function (scope, element, attr) {
          var loadWidget = function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https';
            if (!d.getElementById(id)) {
              js = d.createElement(s);
              js.id = id;
              js.src = p + "://platform.twitter.com/widgets.js";
              fjs.parentNode.insertBefore(js, fjs);
            }
          };
          loadWidget(document, "script", "twitter-wjs");
        }
      }
    }
  ]);
