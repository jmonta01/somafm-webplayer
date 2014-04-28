'use strict';

angular.module('somafmPlayerApp')
    .controller('FavStationsCtrl', ['$scope', '$log', 'StationService', 'FavoriteStationService',
        function ($scope, $log, StationService, FavoriteStationService) {

            $scope.organizedStations = [];
            $scope.stations = [];

            $scope.organizeMethod = '';

            $scope.organizeByName = function () {
                $log.log("organizeByName");
                $scope.organizeMethod = 'name';
                $scope.organizedStations = $scope.stations;
            };

            $scope.organizeByPopularity = function () {
                $log.log("organizeByPopularity");
                $scope.organizeMethod = 'popularity';
                $scope.organizedStations = $scope.stations;
            };

            $scope.organizeByGenre = function () {
                $log.log("organizeByGenre");
                $scope.organizeMethod = 'genre';
                $scope.organizedStations = $scope.stations;
            };


            $scope.addStation = function (station) {
                FavoriteStationService.add(station);
                $scope.getStations();
            };

            $scope.removeStation = function (station) {
                FavoriteStationService.remove(station);
                $scope.getStations();
            };

            $scope.isStationAFav = function (station) {
                return $scope.stations.indexOf(station._id) != -1;
            };

            $scope.getStations = function () {
                var stationIds = FavoriteStationService.get();
                $scope.stations = [];
                angular.forEach(stationIds, function (id) {
                    StationService.getStationByID(id, function (station) {
                        $scope.stations.push(station);
                    });
                });

                $scope.organizeByName();
            };

            $scope.getStations();
        }
    ]);
