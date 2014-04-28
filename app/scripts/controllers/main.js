'use strict';

angular.module('somafmPlayerApp')
    .controller('MainCtrl', ['$scope', '$location', '$log', 'FavoriteStationService',
        function ($scope, $location, $log, FavoriteStationService) {

            $scope.showPlayerControls = false;
            $scope.showGlobalNav = true;

            $scope.availableViews = [
                {label: "All Stations", path: "#/all-stations"},
                {label: "Favorite Stations", path: "#/fav-stations"},
                {label: "Favorite Songs", path: "#/fav-songs"},
                {label: "Community", path: "#/community"},
                {label: "Now Playing", path: "#/now-playing"}
            ];

            $scope.selectedView = $scope.availableViews[0];

            $scope.changeViewTo = function (newView) {
                $scope.selectedView = newView;
                //FIXME: Fix global navigation to use this method.
                $log.error("FIXME: CHANGE LOCATION NOT WORKING")
                $location.path(newView.path);
                $log.log($location.path);
            };

            $scope.selectedStation = null;

            $scope.playStation = function (station) {
                $scope.selectedStation = station;
                $scope.showPlayerControls = true;
            };

            $scope.stopStation = function (station) {
                $scope.selectedStation = null;
                $scope.showPlayerControls = false;
            };


            $scope.toggleFavStation = function (station) {
                station.favorite = !station.favorite;
                if (station.favorite) {
                    FavoriteStationService.add(station);
                } else {
                    FavoriteStationService.remove(station);
                }

                $log.log("toggle fav:", station._id);
            };


        }
    ]);
