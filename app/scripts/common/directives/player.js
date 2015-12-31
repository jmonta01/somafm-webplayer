'use strict';

angular.module('somafmPlayerApp')
  .directive("sfPlayer", [
    'USE_HTML_AUDIO', 'PlayerService',
    function (USE_HTML_AUDIO, PlayerService) {
      return {
        restrict :"E",
        replace: true,
        scope: {
        },
        templateUrl: 'common/player.tpl.html',
        link: function (scope, element, attr) {

          scope.useHtmlPlayer = USE_HTML_AUDIO;
          scope.station = null;

          scope.$watch(
            function () {
              return PlayerService.getPlayingStation();
            },
            function (station) {
              scope.station = station;
            }
          )

        }
      }
    }
  ]);
