'use strict';

angular.module('somafmPlayerApp')
  .directive("sfCommunityFlickrView", [
    '$timeout', 'CommunityService',
    function ($timeout, CommunityService) {
      return {
        restrict :"E",
        replace: true,
        scope: {},
        templateUrl: 'community/views/flickr.tpl.html',
        link: function (scope, element, attr) {
          /*
          var imgContainer = element.children().eq(2);

          var load = function () {
            CommunityService.loadFlickr().then(
              function (data) {
                // Start putting together the HTML string
                var htmlString = "";
                angular.forEach(data.items, function (item) {
                  // want the big ones
                  var imgSrc = (item.media.m).replace("_m.jpg", ".jpg");
                  htmlString += "<div class='thumbnail with-caption'>" +
                    "<img src='" + imgSrc + "' class='img-responsive img-rounded' />" +
                    "<h2>" + item.title + "</h2>" +
                    "</div>";
                });

                // Pop our HTML in the #images DIV
                imgContainer.html(htmlString);
                $timeout(load, 10000);
              }
            );
          };

          load();
          */
        }
      }
    }
  ]);
