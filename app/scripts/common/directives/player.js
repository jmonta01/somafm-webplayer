'use strict';

angular.module('somafmPlayerApp')
  .directive("sfPlayer", [
    '$rootScope', '$timeout', 'PlayerService',
    function ($rootScope, $timeout, PlayerService) {
      return {
        restrict :"E",
        replace: true,
        scope: {},
        templateUrl: 'common/player.tpl.html',
        link: function (scope, element, attr) {
          scope.playing = false;

          scope.play = function (station) {
            PlayerService.play(station);
          };

          scope.stop = function () {
            PlayerService.stop();
          };

          scope.maxVolume = function () {
            scope.setVolume(1);
          };

          scope.updateVolume = function (value) {
            scope.setVolume(value);
          };

          scope.setVolume = function (value) {
            scope.volume = PlayerService.setVolume(value);
          };

          scope.toggleMute = function () {
            PlayerService.toggleMute();
          };

          scope.isMuted = function () {
            return PlayerService.getMuted();
          };

          scope.init = function () {
            PlayerService.registerNode(document.getElementById("audioPlayer"));
            $timeout(function () {
              scope.volume = PlayerService.initVolume();
            });
          };

          scope.init();

          $rootScope.$watch('playingStation', function (station) {
            scope.playing = station != null ? station.playing : false;
          });

        }
      }
    }
  ]);
