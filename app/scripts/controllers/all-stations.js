'use strict';

angular.module('somafmPlayerApp')
    .controller('AllStationsCtrl', ['$scope', '$rootScope', '$log', '$filter', 'StationService', 'FavoriteStationService',
        function ($scope, $rootScope, $log, $filter, StationService, FavoriteStationService) {


            $scope.organizedStations = [];
            $scope.organizedGenres = [];
            $scope.stations = [];

            $scope.defaultOrganizeMethod = 'popularity';
            var lastOrganizeMethod = '';
            $scope.organizeMethod = '';
            $scope.organizeASC = true;

            function organizeByName (src, asc) {
                $scope.organizedStations = $filter('orderBy')(src, "title", asc);
            }

            function organizeByPopularity (src, asc) {
                $scope.organizedStations = $filter('orderBy')(src, function (item) {
                    return parseInt(item.listeners);
                }, asc);
            }

            function organizeByGenre (src, asc) {
                var genres = [];
                var stations = {};
                angular.forEach(src, function (station) {
                    angular.forEach(station.genre.split("|"), function (genre) {

                        if (genres.indexOf(genre) == -1) {
                            genres.push(genre);
                        }

                       if (angular.isUndefined(stations[genre])) {
                           stations[genre] = [];
                       }
                        stations[genre].push(station);

                    });
                });
                $scope.organizedGenres = asc ? genres.sort() : genres.sort().reverse();


                for (var key in stations) {
                    if (stations.hasOwnProperty(key)) {
                        stations[key] = $filter('orderBy')(stations[key], "title", false);
                    }
                }
                $scope.organizedStations = stations;
            }

            $scope.sortBy = function (type) {
                lastOrganizeMethod = $scope.organizeMethod;
                switch (type) {
                    case 'name':
                        $scope.organizeMethod = 'name';
                        $scope.organizeASC = lastOrganizeMethod !== type ? false : !$scope.organizeASC;
                        organizeByName($scope.stations, $scope.organizeASC);
                        break;
                    case 'popularity':
                        $scope.organizeMethod = 'popularity';
                        $scope.organizeASC = lastOrganizeMethod !== type ? true : !$scope.organizeASC;
                        organizeByPopularity($scope.stations, $scope.organizeASC);
                        break;
                    case 'genre':
                        $scope.organizeMethod = 'genre';
                        $scope.organizeASC = lastOrganizeMethod !== type ? true : !$scope.organizeASC;
                        organizeByGenre($scope.stations, $scope.organizeASC);
                        break;
                }
            };

            $scope.loadStations = function () {
                StationService.getAllStations(function (data) {
                    $scope.stations = data;
                    var favs = FavoriteStationService.get();
                    angular.forEach($scope.stations, function (station) {
                        station.favorite = favs.indexOf(station._id) != -1;
                    });
                    $scope.sortBy($scope.defaultOrganizeMethod);
                });
            };

            $scope.loadStations();

        }
    ]);