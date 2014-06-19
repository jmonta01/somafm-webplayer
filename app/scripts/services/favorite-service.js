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

            var lsFn = localStorageService.isSupported ?
                        localStorageService : localStorageService.cookie;


            var getSongs = function () {
                var favs = lsFn.get(key) || '';
                return favs.split(",");
            };

            var addSong = function (song) {
                var favs = getSongs();
                if (favs.indexOf(song._id) == -1) {
                    favs.push(song._id);
                }
                lsFn.add(key, favs.join(","));
            };

            var removeSong = function (song) {
                var favs = getSongs();
                if (favs.indexOf(song._id) > -1) {
                    favs.splice(favs.indexOf(song._id), 1);
                }
                lsFn.add(key, favs.join(","));
            };

            var clearSongs = function () {
                lsFn.add(key, "");
            };


            var toggleSong = function (song) {
                song.favorite = !song.favorite;
                if (song.favorite) {
                    addSong(song);
                } else {
                    removeSong(song);
                }
            };


            return {
                get: getSongs,
                add: addSong,
                remove: removeSong,
                clear: clearSongs,
                toggle: toggleSong
            }
        }
    ]);