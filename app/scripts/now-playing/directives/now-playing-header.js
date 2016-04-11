'use strict';

angular.module('somafmPlayerApp')
  .directive('sfNowPlayingHeader', [
    '$q', '$stateParams', 'StationService', 'FavStationsService',
    function ($q, $stateParams, StationService, FavStationsService) {
      return {
        restrict :'E',
        replace: true,
        scope: {},
        templateUrl: 'now-playing/header.tpl.html',
        link: function (scope, element, attr) {

          scope.toggleFavStation = function () {
            FavStationsService.toggle(scope.station);
          };

          $q.all([
            StationService.getStationDetails($stateParams.stationID),
            FavStationsService.getStations()
          ]).then(
            function (results) {
              var station = results[0], favStations = results[1];
              station.favorite = _.contains(favStations, station.id);
              scope.station = station;
            },
            function (error) {
              console.log(error);
            }
          );
        }
      }
    }
  ]);
