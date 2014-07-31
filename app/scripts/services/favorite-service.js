'use strict';

angular.module('somafmPlayerApp')
    .factory('FavoriteStationService', [ '$cookieStore', '$log', 'localStorageService',
        function ($cookieStore, $log, localStorageService) {

            var key = "somafm-fav-stations";

            var lsFn = localStorageService.isSupported ?
                        localStorageService : localStorageService.cookie;

            var getStations = function () {
                var favs = lsFn.get(key) || '';
                return favs === '' ? [] : favs.split(",");
            };

            var addStation = function (station) {
                station.favorite = true;
                var favs = getStations();
                if (favs.indexOf(station._id) == -1) {
                    favs.push(station._id);
                }
                lsFn.add(key, favs.join(","));
            };

            var removeStation = function (station) {
                station.favorite = false;
                var favs = getStations();
                if (favs.indexOf(station._id) > -1) {
                    favs.splice(favs.indexOf(station._id), 1);
                }
                lsFn.add(key, favs.join(","));
            };

            var clearStations = function () {
                lsFn.add(key, "");
            };

            var toggleStation = function (station) {
                station.favorite = !station.favorite;
                if (station.favorite) {
                    addStation(station);
                } else {
                    removeStation(station);
                }
            };

            return {
                get: getStations,
                add: addStation,
                remove: removeStation,
                clear: clearStations,
                toggle: toggleStation
            }
        }
    ])
    .factory('FavoriteSongService', [ '$cookieStore', '$log', 'localStorageService',
        function ($cookieStore, $log, localStorageService) {

            var key = "somafm-fav-songs";

            var lsFn = localStorageService;

            var isSupported = function () {
                return localStorageService.isSupported;
            };

            var getSongs = function () {
                var favs = lsFn.get(key) || [];
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
                lsFn.add(key, favs);
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
                lsFn.add(key, favs);
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
                lsFn.add(key, "");
            };

            return {
                get: getSongs,
                add: addSong,
                remove: removeSong,
                clear: clearSongs,
                toggle: toggleSongs,
                isFav: isFav,
                isSupported: isSupported
            }
        }
    ]);