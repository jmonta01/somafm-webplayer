'use strict';

angular.module('somafmPlayerApp')
  .directive("news", ['CommunityService',
    function (CommunityService) {
      return {
        restrict :"E",
        replace: true,
        scope: {},
        template: "<div class='community news'></div>",
        link: function (scope, element, attr) {
          //source http://somafm.com/news.xml
          CommunityService.loadNews().then(
            function (response) {
              if (response.banner) {
                var bannerHtml = "<h2 class='banner'>" + response.banner + "</h2>";
                element.append(bannerHtml);
              }

              if (!response.items) {
                return;
              }

              element.append("<h1>News Updates</h1>");

              var itemsHtml = '';

              angular.forEach(response.items, function (item) {
                if (item.date) {
                  itemsHtml += "<dt>" + formatDate(item.date) + "</dt>";
                }
                itemsHtml +=  "<dd>" + item.content + "</dd>";
              });

              element.append("<dl>" + itemsHtml + "</dl>")
            }
          );


          function formatDate (date) {
            return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
          }
        }
      }
    }
  ]);
