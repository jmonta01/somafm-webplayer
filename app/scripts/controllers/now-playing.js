'use strict';

angular.module('somafmPlayerApp')
    .controller('NowPlayingCtrl', ['$scope', '$rootScope', '$log', '$interval', 'StationService',
        function ($scope, $rootScope, $log, $interval, StationService) {

            var songsP;

            $scope.playList = [];

            $scope.getPlayList = function (station) {
                if (station) {
                    StationService.getPlayList(station)
                        .then(function (playList) {
                            $scope.playList = playList;
                            angular.forEach($scope.playList, function (song) {
                                song.favorite = Math.random() > .5;
                            });
                        });
                }
            };

            $scope.toggleFavSong = function (song) {
                song.favorite = !song.favorite;
            };

            $rootScope.$watch('selectedStation', function (station) {
                console.log("selected station changed", station);
                if (station === null) {
                    $interval.cancel(songsP);
                    songsP = undefined;
                    $scope.playList = [];
                } else {
                    songsP = $interval(function () {
                        $scope.getPlayList(station);
                    }, 30000);
                }
                //
            });

        }
    ]);
