'use strict';

angular.module('somafmPlayerApp')
  .directive("sfAllStationsBody", [
    '$state', 'StationService', 'PlayerService', 'FavStationsService',
    function ($state, StationService, PlayerService, FavStationsService) {
      return {
        restrict :"E",
        replace: true,
        templateUrl: 'all-stations/body.tpl.html',
        link: function (scope, element, attr) {
          scope.sort = {
            types: [
              {label: 'Popularity', type: 'popularity', defaultAsc: false},
              {label: 'Name', type: 'name', defaultAsc: true},
              {label: 'Genre', type: 'genre', defaultAsc: true}
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

          scope.loadStations = function (sortType) {
            StationService.getStations().then(
              function (stations) {
                var sortedStation = null;
                switch (scope.sort.selectedType.type) {
                  case 'name':
                    sortedStation = _.sortBy(stations, 'title');
                    if (!scope.sort.asc) sortedStation.reverse();
                    scope.sort.stations = sortedStation;
                    break;
                  case 'popularity':
                    sortedStation = _.sortBy(stations, function (station) {
                      return parseInt(station.listeners);
                    });
                    if (!scope.sort.asc) sortedStation.reverse();
                    scope.sort.stations = sortedStation;
                    break;
                  case 'genre':
                    stations = _.map(stations, function (station) {
                      station.genres = station.genre.split('|');
                      return station;
                    });

                    var genres = _.chain(stations)
                      .pluck('genres')
                      .flatten()
                      .uniq()
                      .value()
                      .sort();

                    sortedStation = _.map(genres, function (genre) {
                      return {
                        label: genre,
                        stations: _.chain(stations)
                          .filter(function (station) {
                            return _.contains(station.genres, genre);
                          })
                          .sortBy('title')
                          .value()
                      };
                    });
                    if (!scope.sort.asc) sortedStation.reverse();
                    scope.sort.stations = sortedStation;
                    break;
                }
              },
              function (error) {
                console.error(error);
              }
            )
          };

          scope.playStation = function (station) {
            $state.go('now-playing', {stationID: station._id});
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
            )
          };

          scope.setSort(_.findWhere(scope.sort.types));
        }
      }
    }
  ]);
