'use strict';

angular.module('somafmPlayerApp')
  .directive("sfHtmlPlayer", [
    'StorageService',
    function (StorageService) {
      return {
        restrict :"E",
        replace: true,
        scope: {
          station: '='
        },
        templateUrl: 'common/player/html-player.tpl.html',
        link: function (scope, element, attr) {

          var volumeKey = 'volume',
              lastVolume,
              stationData = null;

          scope.muted = false;
          scope.playing = false;

          scope.audio = document.getElementById("audioPlayer");

          scope.$watch("station", function (val) {
            console.log('station', val)
            scope.stop();

            stationData = val;
            if (stationData) {
              scope.play();
            } else {
              scope.audio.load();
              scope.playing = false;
            }
          });

          scope.play = function () {
            angular.forEach(stationData.streamUrls.reverse(), function (url) {
              var source = document.createElement('source');
              if (scope.audio.canPlayType('audio/mpeg;')) {
                source.type = 'audio/mpeg';
                source.src = url;
              } else {
                source.type = 'audio/ogg';
                source.src = url;
              }
              scope.audio.appendChild(source);
            });

            scope.audio.load();
            scope.audio.play();
            scope.playing = true;
          };

          scope.stop = function () {
            scope.audio.pause();
            scope.currentTime = 0;
            scope.playing = false;

            angular.element(scope.audio).html("");
          };

          scope.togglePlay = function () {
            if (scope.playing) {
              scope.stop();
            } else {
              scope.play();
            }
          };

          scope.maxVolume = function () {
            if (scope.audio.muted) scope.audio.muted = false;
            scope.setVolume(1);
          };

          scope.updateVolume = function (value) {
            if (scope.audio.muted) scope.audio.muted = false;
            scope.setVolume(value);
          };

          scope.setVolume = function (value) {
            StorageService.add(volumeKey, value);
            scope.volume = scope.audio.volume = value;
          };

          scope.toggleMute = function () {
            scope.muted = !scope.muted;
            scope.audio.muted = scope.muted;
            if (scope.muted)  lastVolume = scope.audio.volume;
            scope.setVolume(scope.muted ? 0 : lastVolume);
          };

          scope.isMuted = function () {
            return scope.audio.muted;
          };

          scope.setVolume(StorageService.get(volumeKey) || 0.5);

        }
      }
    }
  ]);
