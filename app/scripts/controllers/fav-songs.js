'use strict';

angular.module('somafmPlayerApp')
  .controller('FavSongsCtrl', ['$scope', '$window', 'FavoriteSongService', 'SHOP_URI',
        function ($scope, $window, FavoriteSongService, SHOP_URI) {

            $scope.songs = [];

            $scope.refresh = function () {
                $scope.songs = FavoriteSongService.get();
            };

            $scope.remove = function (song) {
                FavoriteSongService.remove(song);
                $scope.refresh();
            };

            $scope.shopSong = function (song) {
                var url = SHOP_URI;
                url = url.replace('{ARTIST}', song.artist);
                url = url.replace('{SONG}', song.title);
                $window.open(url);
            };


            $scope.refresh();
      }
    ]);
