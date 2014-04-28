'use strict';

angular.module('somafmPlayerApp')
    .factory('StationService', [ '$http', '$log', '$q', 'Host',
        function ($http, $log, $q, Host) {

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
                var url = "/channels.xml";
                if (cachedData.length > 0) {
                    callback(cachedData);
                } else {
                    var p = $http.get(Host + url, {transformResponse: parseStationData});
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

            var parsePLS = function (data) {
                var entries = {};

                angular.forEach(data.split("\n"), function (item) {
                    var entry = item.split("=");
                    if (entry.length > 1) {
                        entries[entry[0].toLowerCase()] = entry[1];
                    }
                });

                var count = entries['numberofentries'];
                $log.log(count);

                var urls = [];
                for (var i=1; i<=count; i++) {
                    var url = entries['file' + i];
                    urls.push(url);
                }

                return urls;
            };

            var getPls = function (station, callback) {
                var url = "/[STATION_ID].pls".replace("[STATION_ID]", station._id);
                var p = $http.get(Host + url, {transformResponse: parsePLS});
                p.then(
                    function (response) {
                        callback(response.data);
                    },
                    function (response) {
                        $log.error("Station PLS couldn't be loaded", response);
                        callback(response.data);
                    }
                );
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

                var url = "/[STATION_ID].xml".replace("[STATION_ID]", station._id);
                var p = $http.get(Host + url, {transformResponse: parsePlayListData});
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
                getPls: getPls,
                getPlayList: getStationPlayList
            }
        }
    ]);