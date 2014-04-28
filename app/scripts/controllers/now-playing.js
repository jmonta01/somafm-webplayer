'use strict';

angular.module('somafmPlayerApp')
    .controller('NowPlayingCtrl', ['$scope', '$log', 'StationService',
        function ($scope, $log, StationService) {

            $scope.playList = [];

            $scope.getPlayList = function (station) {
                if (station) {
                    StationService.getPlayList(station, function (playList) {
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

        }
    ]);
