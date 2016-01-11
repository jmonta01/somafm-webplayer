'use strict';

angular.module('somafmPlayerApp')
  .directive("sfCommunityNewsView", [
    '$timeout', 'CommunityService',
    function ($timeout, CommunityService) {
      return {
        restrict :"E",
        replace: true,
        scope: {},
        templateUrl: 'community/views/news.tpl.html',
        link: function (scope, element, attr) {

          var timer = null;
          var formatDate = function (date) {
            return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
          };

          var load = function () {
            $timeout.cancel(timer);
            element.html('');
            CommunityService.loadNews().then(
              function (response) {
                if (response.banner) element.append('<div class="banner">' + response.banner + '</div>');

                if (!response.items)  return;

                element.append('<h1>News Updates</h1>');

                var itemsHtml = '';

                angular.forEach(response.items, function (item) {
                  if (item.date) {
                    itemsHtml += '<dt>' + formatDate(item.date) + '</dt>';
                  }
                  itemsHtml +=  '<dd>' + item.content + '</dd>';
                });

                element.append('<dl>' + itemsHtml + '</dl>')

                timer = $timeout(load, 10000);
              }
            );
          };

          scope.$on('$destroy', function() {
            if (timer) $timeout.cancel(timer);
          });

          load();

        }
      }
    }
  ]);
