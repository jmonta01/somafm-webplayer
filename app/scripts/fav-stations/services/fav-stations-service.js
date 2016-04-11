'use strict';

angular.module('somafmPlayerApp')
  .factory('FavStationsService', [
    '$http', '$log', '$q', 'StorageService',
    function ($http, $log, $q, StorageService) {

      var key = "fav-stations";

      var getStations = function () {
        return $q(function (resolve) {
          resolve((StorageService.get(key) || '').split(","));
        });
      };

      var add = function (station) {
        return $q(function (resolve, reject) {
          station.favorite = true;
          getStations().then(
            function (stations) {
              if (stations.indexOf(station.id) == -1) {
                stations.push(station.id);
              }
              StorageService.add(key, stations.length > 0 ? stations.join(",") : null);
              resolve();
            },
            reject
          );
        });
      };

      var remove = function (station) {
        return $q(function (resolve, reject) {
          station.favorite = false;
          getStations().then(
            function (stations) {
              if (stations.indexOf(station.id) > -1) {
                stations.splice(stations.indexOf(station.id), 1);
              }
              StorageService.add(key, stations.length > 0 ? stations.join(",") : null);
              resolve();
            },
            reject
          );
        });
      };


      var toggle = function (station) {
        return $q(function (resolve, reject) {
          station.favorite = !station.favorite;
          if (station.favorite) {
            add(station).then(resolve, reject);
          } else {
            remove(station).then(resolve, reject);
          }
        });
      };

      return {
        getStations: getStations,
        toggle: toggle
      }
    }
  ]);
