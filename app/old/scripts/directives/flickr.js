'use strict';

angular.module('somafmPlayerApp')
  .directive("flickr", ["$rootScope", 'CommunityService',
    function ($rootScope, CommunityService) {
      return {
        restrict :"E",
        replace: true,
        scope: {},
        template: function () {
          return  "<div class='community flickr'>" +
            "<h1>Here are SomaFM listeners from around the world. Send us your pictures with your SomaFM gear to <a href='mailto:dj@somafm.com'>dj@somafm.com</a> and we'll post them on Flickr.</h1>" +
            "<div id='imagediv'></div>" +
            "<h1>More on Flickr at <a href='http://flickr.com/SomaFM' target='_blank'> www.flickr.com/SomaFM </a></h1>" +
            "</div>";
        },
        link: function (scope, element, attr) {
          var loaded = false;

          if (loaded) {
            //if loaded return, so we don't reload the flickr stream every time
            return;
          }

          CommunityService.loadFlickr().then(
            function (data) {
              // Start putting together the HTML string
              var htmlString = "";
              angular.forEach(data.items, function (item) {
                // want the big ones
                var imgSrc = (item.media.m).replace("_m.jpg", ".jpg");
                htmlString +=   "<div class='thumbnail with-caption'>" +
                  "<img src='" + imgSrc + "' class='img-responsive img-rounded' />" +
                  "<h2>" + item.title + "</h2>" +
                  "</div>";
              });

              // Pop our HTML in the #images DIV
              $('#imagediv').html(htmlString);
              loaded = true;
            }
          );
        }
      }
    }
  ]);
