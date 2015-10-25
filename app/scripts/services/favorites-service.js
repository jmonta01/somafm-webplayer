'use strict';

angular.module('somafmPlayerApp')
  .factory('FavoritesService', [ '$log', 'StorageService', 'localStorageService',
    function ($log, StorageService, localStorageService) {

      var isSupported = function () {
        return localStorageService.isSupported;
      };

      //station methods
      var stationKey = "fav-stations";

      var getStations = function () {
        var favs = StorageService.get(stationKey) || null;
        return favs != null ? favs.split(",") : [];
      };

      var addStation = function (station) {
        station.favorite = true;
        var favs = getStations();
        if (favs.indexOf(station._id) == -1) {
          favs.push(station._id);
        }
        StorageService.add(stationKey, favs.join(","));
      };

      var removeStation = function (station) {
        station.favorite = false;
        var favs = getStations();
        if (favs.indexOf(station._id) > -1) {
          favs.splice(favs.indexOf(station._id), 1);
        }
        StorageService.add(stationKey, favs.join(","));
      };

      var clearStations = function () {
        StorageService.add(stationKey, "");
      };

      var toggleStation = function (station) {
        station.favorite = !station.favorite;
        if (station.favorite) {
          addStation(station);
        } else {
          removeStation(station);
        }
      };

      //song methods
      var songKey = "fav-songs";

      var getSongs = function () {
        var favs = StorageService.get(songKey) || [];
        angular.forEach(favs, function (song) {
          song.favorite = true;
        });
        return favs;
      };

      var addSong = function (song) {
        var favs = getSongs();
        angular.forEach(favs, function (fav) {
          if (song.artist === fav.artist && song.title === fav.title) {
            return false;
          }
        });
        song.favorite = true;
        favs.push(song);
        StorageService.add(songKey, favs);
      };

      var removeSong = function (song) {
        var favs = getSongs();
        for (var i=0; i<favs.length; i++) {
          var fav = favs[i];
          if (song.artist === favs[i].artist && song.title === favs[i].title) {
            song.favorite = false;
            favs.splice(i, 1);
          }

        }
        StorageService.add(songKey, favs);
      };

      var isFav = function (song) {
        var favs = getSongs();
        for (var i=0; i<favs.length; i++) {
          var fav = favs[i];
          if (song.artist === favs[i].artist && song.title === favs[i].title) {
            return true;
          }
        }
        return false;
      };

      var toggleSongs = function (song) {
        if (isFav(song)) {
          removeSong(song);
        } else {
          addSong(song);
        }
      };

      var clearSongs = function () {
        StorageService.add(songKey, "");
      };


      var checkAndSaveLegacyFavs = function () {
        var legacyStations = StorageService.get('somafm-fav-stations', true);
        if (legacyStations) {
          StorageService.add(stationKey, legacyStations);
          StorageService.remove('somafm-fav-stations', true);
        }

        var legacySongs = StorageService.get('somafm-fav-songs', true);
        if (legacySongs) {
          StorageService.add(songKey, legacySongs);
          StorageService.remove('somafm-fav-songs', true);
        }
      };

      checkAndSaveLegacyFavs();


      return {
        isSupported: isSupported,
        station: {
          get: getStations,
          add: addStation,
          remove: removeStation,
          clear: clearStations,
          toggle: toggleStation
        },
        song: {
          get: getSongs,
          add: addSong,
          remove: removeSong,
          clear: clearSongs,
          toggle: toggleSongs,
          isFav: isFav
        }
      }
    }
  ]);
