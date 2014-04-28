'use strict';

angular.module('somafmPlayerApp')
    .controller('MainCtrl', ['$scope', '$location', '$log', 'StationService', 'FavoriteStationService',
        function ($scope, $location, $log, StationService, FavoriteStationService) {

            $scope.showPlayerControls = false;
            $scope.showGlobalNav = true;


            var allStationsView = {label: "All Stations", path: "/all-stations"};
            var favStationsView = {label: "Favorite Stations", path: "/fav-stations"};
            var favSongsView = {label: "Favorite Songs", path: "/fav-songs"};
            var communityView = {label: "Community", path: "/community"};
            var nowPlayingView = {label: "Now Playing", path: "/now-playing"};

            $scope.availableViews = [
                allStationsView,
                favStationsView,
//                favSongsView,
//                communityView,
                nowPlayingView
            ];

            $scope.selectedView = $scope.availableViews[0];

            $scope.changeViewTo = function (newView) {
                $scope.selectedView = newView;
                $location.path(newView.path);
            };

            $scope.selectedStation = null;

            $scope.playStation = function (station) {
                StationService.getPls(station, function (data) {
                    $scope.selectedStation = station;
                    $scope.selectedStation.urls = data;
                    $scope.showPlayerControls = true;
                    $scope.changeViewTo(nowPlayingView);


                })
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
