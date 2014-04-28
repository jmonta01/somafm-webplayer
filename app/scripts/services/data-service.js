'use strict';

angular.module('somafmPlayerApp')
    .factory('StationService', [ '$http', '$log', '$q',
        function ($http, $log, $q) {

            var cachedData = [];

            var parseStationData = function(data) {

                var x2js = new X2JS();
                var json = x2js.xml_str2json( data );

                var parsedChannels = [],
                    channels = json.channels.channel;

                angular.forEach(channels, function (channel) {
                    var parsedChannel = {};
                    angular.forEach(channel, function (prop, key) {
                        parsedChannel[key] = prop.toString();
                    });
                    parsedChannels.push(parsedChannel);
                });
                return parsedChannels;
            };

            var getAllStations = function (callback) {
                var url = "/data/channels.xml";
                if (cachedData.length > 0) {
                    callback(cachedData);
                } else {
                    var p = $http.get(url, {transformResponse: parseStationData});
                    p.then(
                        function (response) {
                            cachedData = response.data;
                            callback(cachedData);
                        },
                        function (response) {
                            $log.error("Station list couldn't be loaded", response);
                            callback(cachedData);
                        }
                    );
                }
            };

            var getStationDetails = function (id, callback) {
                getAllStations(function (stations) {
                    angular.forEach(stations, function (station) {
                        if (station._id === id) {
                            callback(station);
                        }
                    });
                });
            };

            var parsePlayListData = function(data) {

                var x2js = new X2JS();
                var json = x2js.xml_str2json( data );

                var parsedSongs = [],
                    songs = json.songs.song;

                angular.forEach(songs, function (song) {
                    var parsedSong = {};
                    angular.forEach(song, function (prop, key) {
                        parsedSong[key] = prop.toString();
                    });
                    parsedSongs.push(parsedSong);
                });
                return parsedSongs;
            };

            var getStationPlayList = function (station, callback) {
                $log.log(station._id);

                var url = "/data/[STATION_ID].xml".replace("[STATION_ID]", station._id);
                var p = $http.get(url, {transformResponse: parsePlayListData});
                p.then(
                    function (response) {
                        callback(response.data);
                    },
                    function (response) {
                        $log.error("Station list couldn't be loaded", response);
                        callback(response.data);
                    }
                );
            };

            return {
                getAllStations: getAllStations,
                getStationByID: getStationDetails,
                getPlayList: getStationPlayList
            }
        }
    ]);