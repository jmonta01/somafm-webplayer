'use strict';

angular.module('somafmPlayerApp')
  .directive("sfPlayer", [
    '$rootScope', '$timeout', 'PlayerService', 'WebAudioPlayerService',
    function ($rootScope, $timeout, PlayerService, WebAudioPlayerService) {
      return {
        restrict :"E",
        replace: true,
        scope: {},
        templateUrl: 'common/player.tpl.html',
        link: function (scope, element, attr) {
          scope.playing = false;

          scope.play = function (station) {
            WebAudioPlayerService.play(station);
          };

          scope.stop = function () {
            WebAudioPlayerService.stop();
          };

          scope.maxVolume = function () {
            scope.setVolume(1);
          };

          scope.updateVolume = function (value) {
            scope.setVolume(value);
          };

          scope.setVolume = function (value) {
            scope.volume = WebAudioPlayerService.setVolume(value);
          };

          scope.toggleMute = function () {
            WebAudioPlayerService.toggleMute();
          };

          scope.isMuted = function () {
            return WebAudioPlayerService.getMuted();
          };

          scope.init = function () {
            WebAudioPlayerService.init(document.getElementById("audioPlayer"));
            scope.volume = WebAudioPlayerService.getVolume();
          };

          scope.init();

          $rootScope.$watch('playingStation', function (station) {
            scope.playing = station != null ? station.playing : false;
          });

        }
      }
    }
  ]);
