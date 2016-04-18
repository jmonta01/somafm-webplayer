'use strict';

angular.module('somafmPlayerApp')
  .directive("sfPlayer", [
    'StationService', 'WebAudioPlayerService',
    function (StationService, WebAudioPlayerService) {
      return {
        restrict :"E",
        replace: true,
        scope: {
          selectedStation: '='
        },
        templateUrl: 'common/player.tpl.html',
        link: function (scope, element, attr) {
          scope.playing = false;

          scope.play = function () {
            WebAudioPlayerService.play(scope.selectedStation);
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
            scope.volume = WebAudioPlayerService.getVolume();
          };

          scope.isMuted = function () {
            return WebAudioPlayerService.getMuted();
          };

          scope.init = function () {
            WebAudioPlayerService.init(document.getElementById("audioPlayer"));
            scope.volume = WebAudioPlayerService.getVolume();
          };

          scope.init();

        }
      }
    }
  ]);
