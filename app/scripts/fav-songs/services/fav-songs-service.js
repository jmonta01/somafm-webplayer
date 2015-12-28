'use strict';

angular.module('somafmPlayerApp')
  .factory('FavSongsService', [
    '$log', '$q', 'StorageService',
    function ($log, $q, StorageService) {

      var songs = [],
          songKey = "fav-songs";

      var getSongs = function (refresh) {
        if (angular.isUndefined(refresh)) refresh = false;
        return $q(function (resolve, reject) {
          if (refresh && songs != null) {
            resolve(songs);
          } else {
            songs = StorageService.get(songKey) || null;
            resolve(songs);
          }
        });
      };

      var addSong = function (song) {
        return $q(function (resolve, reject) {
          getSongs().then(
            function (songs) {
              if (angular.isDefined(song)) reject();

              song.favorite = true;
              songs.push(_.pick(song, 'title', 'artist', 'album', 'albumart', 'date'));
              StorageService.add(songKey, songs);

              getSongs(true).then(resolve, reject);
            }
          );
        });
      };

      var removeSong = function (song) {
        return $q(function (resolve, reject) {
          getSongs().then(
            function (songs) {
              if (!angular.isDefined(song)) reject();

              var songMatch = _.findWhere(songs, {artist: song.artist, album: song.album, title: song.title});
              if (songMatch != null) {
                song.favorite = false;
                songs.splice(_.indexOf(songs, songMatch), 1);
                StorageService.add(songKey, songs);
              }

              getSongs(true).then(resolve, reject);
            }
          );
        });
      };

      var isFav = function (song) {
        return $q(function (resolve, reject) {
          getSongs().then(
            function (songs) {
              resolve(_.findWhere(songs, {artist: song.artist, title: song.title}) != null);
            }
          );
        });
      };

      var toggleSongs = function (song) {
        return $q(function (resolve, reject) {
          isFav(song).then(
            function (fav) {
              if (fav) {
                removeSong(song).then(resolve, reject);
              } else {
                addSong(song).then(resolve, reject);
              }
            },
            reject
          )
        });
      };

      var clearSongs = function () {
        return $q(function (resolve) {
          StorageService.add(songKey, "");
          resolve();
        });
      };

      return {
        get: getSongs,
        add: addSong,
        remove: removeSong,
        clear: clearSongs,
        toggle: toggleSongs,
        isFav: isFav
      }
    }
  ]);
