'use strict';

angular.module('somafmPlayerApp')
  .directive("sfFavSongsBody", [
    '$window', 'SHOP_URI', 'FavSongsService',
    function ($window, SHOP_URI, FavSongsService) {
      return {
        restrict :"E",
        replace: true,
        scope: {},
        templateUrl: 'fav-songs/body.tpl.html',
        link: function (scope, element, attr) {

          scope.songs = [];

          scope.loadSongs = function () {
            FavSongsService.get().then(
              function (songs) {
                scope.songs = songs;
              }
            );
          };

          scope.remove = function (song) {
            FavSongsService.remove(song).then(
              function () {
                scope.loadSongs();
              },
              function () {
                scope.loadSongs();
              }
            )
          };

          scope.shopSong = function (song) {
            var url = SHOP_URI;
            url = url.replace('{ARTIST}', song.artist);
            url = url.replace('{SONG}', song.title);
            $window.open(url);
          };

          scope.loadSongs();

        }
      }
    }
  ]);
