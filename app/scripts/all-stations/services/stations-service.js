'use strict';

angular.module('somafmPlayerApp')
  .factory('StationService', [
    '$http', '$log', '$q', 'AppURLs', 'FavStationsService', 'DetectorService', 'PlsTransform',
    function ($http, $log, $q, AppURLs, FavStationsService, DetectorService, PlsTransform) {

      var parseData = true,
        stations = [];

      var getStations = function () {
        return $q(function (resolve, reject) {
          if (stations.length > 0) {
            resolve(stations);
          } else {
            $http.get(AppURLs.allStations.url, {})
              .success(function (response) {
                FavStationsService.getStations().then(
                  function (favs) {
                    stations = response.channels;
                    _.each(stations, function (station) {
                      station.favorite = _.contains(favs, station.id);
                    });
                    resolve(stations);
                  },
                  reject
                );
              })
              .error(reject);
          }
        });
      };

      var getStationDetails = function (stationId) {
        return $q(function (resolve, reject) {
          getStations().then(
            function (stations) {
              var match = _.findWhere(stations, {id: stationId});
              resolve(match != null ? match : null);
            },
            reject
          );
        });
      };

      var getStationPls = function (stationId) {
        return $q(function (resolve, reject) {
          var url = AppURLs.pls.url;
          url = url.replace(AppURLs.pls.stationKey, stationId);
          url = url.replace(AppURLs.pls.qualityKey, DetectorService.getAudioQuality());

          var opts = {};
          if (parseData) {
            opts['transformResponse'] = PlsTransform;
          }
          $http.get(url, opts).success(resolve).error(reject);
        });
      };

      var getStationPlayList = function (stationId) {
        return $q(function (resolve, reject) {
          var url = AppURLs.playList.url.replace(AppURLs.playList.key, stationId);
          var opts = {};
          if (parseData) {
            //opts['transformResponse'] = PlaylistTransform;
          }
          $http.get(url, opts).success(resolve).error(reject);
        });
      };

      return {
        getStations: getStations,
        getStationDetails: getStationDetails,
        getStationPls: getStationPls,
        getStationPlayList: getStationPlayList,
        parseXML: function (val) {
          parseData = val;
        }
      }
    }
  ]);
