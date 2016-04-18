'use strict';

angular.module('somafmPlayerApp')
  .directive("sfFavStationsBody", [
    '$q', '$state', 'StationService', 'FavStationsService', 'PlayerService',
    function ($q, $state, StationService, FavStationsService, PlayerService) {
      return {
        restrict :"E",
        replace: true,
        scope: {},
        templateUrl: 'fav-stations/body.tpl.html',
        link: function (scope, element, attr) {

          scope.sort = {
            types: [
              {label: 'Name', type: 'name', defaultAsc: true},
              {label: 'Popularity', type: 'popularity', defaultAsc: false}
            ],
            selectedType: null,
            asc: true,
            stations: []
          };

          scope.setSort = function (sortType) {
            if (scope.sort.selectedType === sortType) {
              scope.sort.asc = !scope.sort.asc
            } else {
              scope.sort.selectedType = sortType;
              scope.sort.asc = sortType.defaultAsc;
            }
            scope.loadStations();
          };

          scope.loadStations = function () {
            FavStationsService.getStations().then(
              function (stations) {
                var calls = [], loadedStations = [];
                _.each(stations, function (station) {
                  calls.push(
                    StationService.getStationDetails(station).then(
                      function (station) {
                        if (station != null) {
                          loadedStations.push(station);
                        }
                      }
                    )
                  );
                });

                $q.all(calls).then(
                  function () {
                    var sortedStation = null;
                    switch (scope.sort.selectedType.type) {
                      case 'name':
                        sortedStation = _.sortBy(loadedStations, 'title');
                        if (!scope.sort.asc) sortedStation.reverse();
                        scope.sort.stations = sortedStation;
                        break;
                      case 'popularity':
                        sortedStation = _.sortBy(loadedStations, function (station) {
                          return parseInt(station.listeners);
                        });
                        if (!scope.sort.asc) sortedStation.reverse();
                        scope.sort.stations = sortedStation;
                        break;
                    }
                  },
                  function (error) {
                    console.error(error);
                  }
                );
              },
              function (error) {
                console.error(error);
              }
            )
          };

          scope.playStation = function (station) {
            $state.go('now-playing', {stationID: station.id, autoPlay: true});
          };

          scope.isStationPlaying = function (station) {
            return PlayerService.isPlaying(station);
          };

          scope.stopStation = function () {
            PlayerService.stop();
          };

          scope.toggleFavStation = function (station) {
            FavStationsService.toggle(station).then(
              function () {
                scope.loadStations();
              },
              function (error) {
                scope.loadStations();
              }
            );
          };

          scope.setSort(_.first(scope.sort.types));


        }
      }
    }
  ]);
