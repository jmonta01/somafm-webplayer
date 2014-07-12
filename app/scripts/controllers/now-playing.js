'use strict';

angular.module('somafmPlayerApp')
    .controller('NowPlayingCtrl', ['$scope', '$rootScope', '$timeout', '$state', '$stateParams', '$window', 'PlayerService', 'StationService', 'FavoriteSongService', 'FavoriteStationService', 'SHOP_URI',
        function ($scope, $rootScope, $timeout, $state, $stateParams, $window, PlayerService, StationService, FavoriteSongService, FavoriteStationService, SHOP_URI) {


            $scope.station = null;
            $scope.playList = [];

            $scope.getPlayList = function (station) {
                if (station) {
                    StationService.getPlayList(station)
                        .then(function (playList) {
                            $scope.playList = playList;
                            angular.forEach($scope.playList, function (song) {
                                song.favorite = Math.random() > .5;
                            });

                            $timeout.cancel($rootScope.timer);
                            $rootScope.timer = $timeout(function () {
                                $scope.getPlayList($rootScope.selectedStation);
                            }, 5 * 1000)

                        });
                }
            };

            $scope.$on('$destroy', function(){
                $timeout.cancel($rootScope.timer);
            });

            $scope.toggleFavStation = function (station) {
                FavoriteStationService.toggle(station);
            };

            $scope.toggleFavSong = function (song) {
                FavoriteSongService.toggle(song);
            };

            $scope.shopSong = function (song) {
                var url = SHOP_URI;
                url = url.replace('{ARTIST}', song.artist);
                url = url.replace('{SONG}', song.title);
                $window.open(url);
            };

            $rootScope.$watch("playingStation", function () {
                if ($scope.station !== $rootScope.playingStation) {
                    $scope.station = $rootScope.playingStation;
                    if ($scope.station) {
                        $scope.getPlayList($scope.station);
                    }
                }
            });

            if ($stateParams.stationID) {
                if (!$rootScope.playingStation || ($rootScope.playingStation && $stateParams.stationID !== $rootScope.playingStation._id)) {
                    StationService.getStationByID($stateParams.stationID)
                        .then(function (data) {
                            PlayerService.play(data);
                        });
                }
            } else {
                $state.go("all-stations");
            }


        }
    ]);