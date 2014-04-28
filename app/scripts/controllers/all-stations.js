'use strict';

angular.module('somafmPlayerApp')
    .controller('AllStationsCtrl', ['$scope', '$log', 'StationService', 'FavoriteStationService',
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

            $scope.loadStations = function () {
                StationService.getAllStations(function (data) {
                    $scope.stations = data;
                    var favs = FavoriteStationService.get();
                    angular.forEach($scope.stations, function (station) {
                        station.favorite = favs.indexOf(station._id) != -1;
                    });
                    $scope.organizeByName();
                });
            };

            $scope.loadStations();

        }
    ]);