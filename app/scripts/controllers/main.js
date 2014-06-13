'use strict';

angular.module('somafmPlayerApp')
    .controller('MainCtrl', ['$scope', '$rootScope', '$window', '$location', '$log', 'StationService', 'FavoriteStationService',
        function ($scope, $rootScope, $window, $location, $log, StationService, FavoriteStationService) {

            $scope.showPlayerControls = false;
            $scope.showGlobalNav = true;

            var allStationsView = {label: "All Stations", path: "/all-stations", class:"all-stations"};
            var favStationsView = {label: "Favorite Stations", path: "/fav-stations", class: "fav-stations"};
            var favSongsView = {label: "Favorite Songs", path: "/fav_songs", class: "fav-songs"};
            var communityView = {label: "Community", path: "/community", class: "community" };
            var nowPlayingView = {label: "Now Playing", path: "/now-playing", class: "now-playing"};

            $scope.availableViews = [
                allStationsView,
                favStationsView,
//                favSongsView,
//                communityView,
                nowPlayingView
            ];

            $scope.selectedView = $scope.availableViews[0];

            $scope.isDisabled = function (view) {
                var disabled = false;
                if (view === nowPlayingView) {
                    disabled = !$rootScope.selectedStation;
                }
                return disabled;
            };

            $scope.$on('$routeChangeSuccess', function() {
                angular.forEach($scope.availableViews, function (view) {
                    if (view.path === $location.path()) {
                        $scope.selectedView = view;
                    }
                });
            });

            $scope.changeViewTo = function (newView) {
                if (newView === nowPlayingView && !$rootScope.selectedStation) {
                    return;
                }
                $scope.selectedView = newView;
                $location.path(newView.path);
            };

            $rootScope.changeViewToDefault = function () {
                $scope.changeViewTo(allStationsView);
            };

            $rootScope.selectedStation = null;

            $rootScope.playStation = function (station) {
                $rootScope.selectedStation = null;
                $scope.showPlayerControls = false;

                StationService.getPls(station)
                    .then(function (data) {
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

            //used explicitly by the flash player fallback.
            $window.getStreams = function () {
                return $rootScope.selectedStation ? $rootScope.selectedStation.urls : [];
            }

        }
    ]);
