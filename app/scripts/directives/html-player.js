'use strict';

angular.module('somafmPlayerApp')
  .directive("htmlplayer", ["$rootScope", '$window', '$timeout', 'StorageService',
    function ($rootScope, $window, $timeout, StorageService) {
      return {
        restrict : "E",
        replace : true,
        scope : {
          station: "="
        },
        template:
          "<div class='player'>" +
          "<audio id='audioPlayer' autoplay='true' preload='none'></audio>" +
          "<button id='playBtn' class='btn btn-link btn-lg' ng-show='!playing' ng-disabled='!station' ng-click='togglePlay()'><span class='glyphicon glyphicon-play'></span></button>" +
          "<button id='stopBtn' class='btn btn-link btn-lg' ng-show='playing' ng-disabled='!station' ng-click='togglePlay()'><span class='glyphicon glyphicon-stop'></span></button>" +
          "<button id='unmuteBtn' class='btn btn-link btn-lg' ng-show='!isMuted()' ng-click='toggleMute()'><span class='glyphicon glyphicon-volume-down'></span></button>" +
          "<button id='muteBtn' class='btn btn-link btn-lg' ng-show='isMuted()' ng-click='toggleMute()'><span class='glyphicon glyphicon-volume-off'></span></button>" +
          "<volumebar id='volumeslider' value='volume' min='0' max='1' value-change='updateVolume(val)'></volumebar>" +
          "<button id='maxvolBtn' class='btn btn-link btn-lg' ng-click='maxVolume()'><span class='glyphicon glyphicon-volume-up'></span></button>" +
          "</div>",
        link: function (scope, element, attr) {
          var volumeKey = 'volume', lastVolume, stationData = null;

          scope.muted = false;
          scope.playing = false;

          scope.audio = document.getElementById("audioPlayer");

          scope.$watch("station", function (val) {
            scope.stop();

            stationData = val;
            if (stationData) {
              scope.play();
            } else {
              scope.audio.load();
              scope.playing = false;
            }

            $timeout(function () {
              window.dispatchEvent(new Event('resize'));
            }, 50)

          });

          angular.element($window).bind( "resize", function () {
            scope.updateLayout();
          });

          scope.updateLayout = function () {
            var totalWidth = parseInt(element.css('width').replace('px', ''));

            if (!scope.playing) {
              totalWidth -= parseInt(angular.element(document.getElementById('playBtn')).css('width').replace('px', ''));
            }   else {
              totalWidth -= parseInt(angular.element(document.getElementById('stopBtn')).css('width').replace('px', ''));
            }

            if (!scope.isMuted()) {
              totalWidth -= parseInt(angular.element(document.getElementById('unmuteBtn')).css('width').replace('px', ''));
            }   else {
              totalWidth -= parseInt(angular.element(document.getElementById('muteBtn')).css('width').replace('px', ''));
            }

            totalWidth -= parseInt(angular.element(document.getElementById('maxvolBtn')).css('width').replace('px', ''));
            totalWidth -= 30;

            angular.element(document.getElementById('volumeslider')).css('width', Math.min(totalWidth, 200) + 'px');
          };

          scope.play = function () {
            angular.forEach(stationData.urls.reverse(), function (url) {
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

          scope.updateLayout();
          scope.setVolume(StorageService.get(volumeKey) || 0.5);
        }
      }
    }
  ]);
