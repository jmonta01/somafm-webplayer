'use strict';

angular.module('somafmPlayerApp')
  .controller('NowPlayingCtrl', ['$scope', '$rootScope', '$timeout', '$state', '$stateParams', '$window', 'PlayerService', 'StationService', 'FavoritesService', 'SHOP_URI', 'POLL_INT',
    function ($scope, $rootScope, $timeout, $state, $stateParams, $window, PlayerService, StationService, FavoritesService, SHOP_URI, POLL_INT) {

      $scope.station = null;
      $scope.playList = [];

      $scope.getPlayList = function (station) {
        if (station) {
          StationService.getPlayList(station)
            .then(function (playList) {
              $scope.playList = playList;
              angular.forEach($scope.playList, function (song) {
                song.favorite = FavoritesService.song.isFav(song);
              });
              $timeout.cancel($rootScope.timer);
              $rootScope.timer = $timeout(function () {
                $scope.getPlayList($rootScope.playingStation);
              }, POLL_INT)

            });
        }
      };

      $scope.$on('$destroy', function() {
        $timeout.cancel($rootScope.timer);
      });

      $scope.toggleFavStation = function (station) {
        FavoritesService.station.toggle(station);
      };

      $scope.toggleFavSong = function (song) {
        FavoritesService.song.toggle(song);
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
