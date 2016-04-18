'use strict';

angular.module('somafmPlayerApp')
  .factory('StationService', [
    '$http', '$log', '$q', 'AppURLs', 'FavStationsService', 'DetectorService', 'PlsTransform',
    function ($http, $log, $q, AppURLs, FavStationsService, DetectorService, PlsTransform) {

      var self = {
        stations: [],
        selectedStation: null
      };

      var getStations = function () {
        return $q(function (resolve, reject) {
          if (self.stations.length > 0) {
            resolve(self.stations);
          } else {
            $http.get(AppURLs.allStations.url, {})
              .success(function (response) {
                FavStationsService.getStations().then(
                  function (favs) {
                    self.stations = response.channels;
                    _.each(self.stations, function (station) {
                      station.favorite = _.contains(favs, station.id);
                    });
                    resolve(self.stations);
                  },
                  reject
                );
              })
              .error(reject);
          }
        });
      };

      var selectStation = function (stationId) {
        return $q(function (resolve, reject) {
          if (self.selectedStation && self.selectedStation.id == stationId) {
            resolve(self.selectedStation);
          } else {
            getStationDetails(stationId).then(
              function (station) {
                getStationPls(station).then(
                  function () {
                    self.selectedStation = station;
                    resolve(self.selectedStation);
                  },
                  reject
                );
              },
              reject
            );
          }
        });
      };

      var getSelectedStation = function () {
        return self.selectedStation;
      };

      var getStationDetails = function (stationId) {
        return $q(function (resolve, reject) {
          getStations().then(
            function (stations) {
              var station = _.findWhere(stations, {id: stationId}) || null;
              resolve(station);
            },
            reject
          );
        });
      };

      var getStationPls = function (station) {
        return $q(function (resolve, reject) {

          if (station.streamUrls) {
            resolve(station);
          } else {
            var formatArray = DetectorService.getAudioFormatArray(),
              qualityArray = DetectorService.getAudioQualityArray(),
              opts = {
                transformResponse: PlsTransform
              },
              calls = [];

            _.each(station.playlists, function (playlist) {
              calls.push($q(function (resolve, reject) {
                $http.get(playlist.url, opts).success(
                  function (result) {
                    playlist.streamUrls = result;
                    resolve(playlist);
                  }
                )
                  .error(reject);
              }));
            });

            $q.all(calls).then(
              function () {
                station.streamUrls = [];

                _.each(qualityArray, function (quality) {
                  _.each(formatArray, function (format) {
                    var playlist = _.findWhere(station.playlists, {format: format.key, quality: quality});
                    if (angular.isDefined(playlist)) {
                      playlist.streamUrls = _.map(playlist.streamUrls, function (streamUrl) {
                        return {
                          type: format.codec,
                          url: streamUrl
                        }
                      });
                      station.streamUrls.push(playlist.streamUrls);
                    }
                  });
                });

                station.streamUrls = _.flatten(station.streamUrls);
                resolve(station);
              },
              reject
            );
          }
        });
      };

      var getStationPlayList = function (stationId) {
        return $q(function (resolve, reject) {
          var url = AppURLs.playList.url.replace(AppURLs.playList.key, stationId);
          var opts = {};
          $http.get(url, opts).success(resolve).error(reject);
        });
      };

      return {
        selectStation: selectStation,
        getSelectedStation: getSelectedStation,
        getStations: getStations,
        getStationDetails: getStationDetails,
        getStationPls: getStationPls,
        getStationPlayList: getStationPlayList
      }
    }
  ]);
