'use strict';

angular.module('somafmPlayerApp')
    .factory('FavoriteStationService', [ '$cookieStore', '$log',
        function ($cookieStore, $log) {

            var key = "somafm-fav-stations";

            var getStations = function () {
                var favs = $cookieStore.get(key) || '';
                return favs.split(",");
            };

            var addStation = function (station) {
                var favs = getStations();
                if (favs.indexOf(station._id) == -1) {
                    favs.push(station._id);
                }
                $cookieStore.put(key, favs.join(","));
            };

            var removeStation = function (station) {
                var favs = getStations();
                if (favs.indexOf(station._id) > -1) {
                    favs.splice(favs.indexOf(station._id), 1);
                }
                $cookieStore.put(key, favs.join(","));
            };

            return {
                get: getStations,
                add: addStation,
                remove: removeStation
            }
        }
    ])
    .factory('FavoriteSongService', [ '$cookieStore', '$log',
        function ($cookieStore, $log) {

            var key = "somafm-fav-songs";

            var getSongs = function () {
                var favs = $cookieStore.get(key) || '';
                return favs.split(",");
            };

            var addSong = function (song) {
                var favs = getSongs();
                if (favs.indexOf(song._id) == -1) {
                    favs.push(song._id);
                }
                $cookieStore.put(key, favs.join(","));
            };

            var removeSong = function (song) {
                var favs = getSongs();
                if (favs.indexOf(song._id) > -1) {
                    favs.splice(favs.indexOf(song._id), 1);
                }
                $cookieStore.put(key, favs.join(","));
            };

            return {
                get: getSongs,
                add: addSong,
                remove: removeSong
            }
        }
    ]);