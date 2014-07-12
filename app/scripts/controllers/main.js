'use strict';

angular.module('somafmPlayerApp')
    .controller('MainCtrl', ['$scope', 'FavoriteStationService', 'PlayerService',
        function ($scope, FavoriteStationService, PlayerService) {

            $scope.showPlayerControls = false;

            $scope.playStation = function (station) {
                PlayerService.play($scope, station);
            };

            $scope.stopStation = function (station) {
                PlayerService.stop($scope, station);
            };

            $scope.toggleFavStation = function (station) {
                FavoriteStationService.toggle(station);
            };

            $scope.showPlayer = function () {
                return PlayerService.showControls();
            };

            $scope.isSelected = function (id) {
                var el = angular.element(document.getElementById(id));
                return el.hasClass('selected');
            }

        }
    ]);
