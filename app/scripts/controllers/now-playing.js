'use strict';

angular.module('somafmPlayerApp')
    .controller('NowPlayingCtrl', ['$scope', '$rootScope', '$log', '$timeout', 'StationService',
        function ($scope, $rootScope, $log, $timeout, StationService) {

            $rootScope.timer;
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

            $scope.getPlayList($rootScope.selectedStation);


            $scope.toggleFavSong = function (song) {
                song.favorite = !song.favorite;
            };

            $scope.$on('$destroy', function(){
                $timeout.cancel($rootScope.timer);
            });

        }
    ]);
