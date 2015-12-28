'use strict';

angular.module('somafmPlayerApp')
  .factory('PlayerService', [
    '$q', 'StationService',
    function ($q, StationService) {

      var playingStation = null,
          streamUrls = null;

      var play = function (station) {
        return $q(function (resolve, reject) {
          StationService.getStationPls(station._id).then(
            function (data) {
              playingStation = station;
              streamUrls = data;
              resolve();
            },
            reject
          );
        });
      };

      var stop = function () {
        return $q(function (resolve) {
          playingStation = null;
          streamUrls = null;
          resolve();
        });
      };


      return {
        play: play,
        stop: stop,
        playingStation: playingStation,
        streamUrls: streamUrls
      }
    }
  ]);
