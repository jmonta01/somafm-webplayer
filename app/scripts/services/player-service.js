'use strict';

angular.module('somafmPlayerApp')
    .factory('PlayerService', [ '$log', '$rootScope', '$window', 'StationService',
        function ($log, $rootScope, $window, StationService) {

            var playStation = function (station) {
                $rootScope.playingStation = null;
                $rootScope.showControls = false;

                StationService.getPls(station)
                    .then(function (data) {
                        $rootScope.playingStation = station;
                        $rootScope.playingStation.urls = data;
                        $rootScope.showControls = true;
                    });
            };

            var stopStation = function (station) {
                $rootScope.playingStation = null;
                $rootScope.showControls = false;
            };

            var getStation = function () {
                return $rootScope.playingStation;
            };

            //used explicitly by the flash player fallback.
            $window.getStreams = function () {
                return playStation ? playStation.urls : [];
            };

            return {
                play: playStation,
                stop: stopStation,
                station: getStation,
                showControls: $rootScope.showControls
            }
        }
    ]);