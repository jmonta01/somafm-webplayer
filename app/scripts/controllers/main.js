'use strict';

angular.module('somafmPlayerApp')
    .controller('MainCtrl', ['$scope', '$rootScope', '$location', '$log', 'StationService', 'FavoriteStationService',
        function ($scope, $rootScope, $location, $log, StationService, FavoriteStationService) {

            $scope.showPlayerControls = false;
            $scope.showGlobalNav = true;


            var allStationsView = {label: "All Stations", path: "/all-stations", btnIcon: "all-stations-btn.png", selectedBtnIcon: "all-stations-selected-btn.png"};
            var favStationsView = {label: "Favorite Stations", path: "/fav-stations", btnIcon: "fav-stations-btn.png", selectedBtnIcon: "fav-stations-selected-btn.png"};
            var favSongsView = {label: "Favorite Songs", path: "/fav-songs", btnIcon: "fav-songs-btn.png", selectedBtnIcon: "fav-songs-selected-btn.png"};
            var communityView = {label: "Community", path: "/community", btnIcon: "community-btn.png", selectedBtnIcon: "community-selected-btn.png"};
            var nowPlayingView = {label: "Now Playing", path: "/now-playing", btnIcon: "now-playing-btn.png", selectedBtnIcon: "now-playing-selected-btn.png"};

            $scope.availableViews = [
                allStationsView,
                favStationsView,
//                favSongsView,
//                communityView,
                nowPlayingView
            ];

            $scope.selectedView = $scope.availableViews[0];

            $scope.$on('$routeChangeSuccess', function() {
                angular.forEach($scope.availableViews, function (view) {
                    if (view.path === $location.path()) {
                        $scope.selectedView = view;
                    }
                });
            });


            $scope.changeViewTo = function (newView) {
                $scope.selectedView = newView;
                $location.path(newView.path);
            };


            $rootScope.selectedStation = null;

            $rootScope.playStation = function (station) {
                StationService.getPls(station, function (data) {
                    $rootScope.selectedStation = station;
                    $rootScope.selectedStation.urls = data;
                    $scope.showPlayerControls = true;
                    $scope.changeViewTo(nowPlayingView);
                });
            };

            $rootScope.stopStation = function (station) {
                $rootScope.selectedStation = null;
                $scope.showPlayerControls = false;
            };


            $rootScope.toggleFavStation = function (station) {
                station.favorite = !station.favorite;
                if (station.favorite) {
                    FavoriteStationService.add(station);
                } else {
                    FavoriteStationService.remove(station);
                }
            };



        }
    ]);
