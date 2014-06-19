angular.module('somafmPlayerApp')
.factory("StationTransform",
    function () {
        return function (data) {
            var x2js = new X2JS();
            var xmlDoc = x2js.parseXmlString(data);
            var json = x2js.xml2json( xmlDoc );

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
        }
    }
)
.factory("PlsTransform",
    function () {
        return function (data) {
            var entries = {};

            angular.forEach(data.split("\n"), function (item) {
                var entry = item.split("=");
                if (entry.length > 1) {
                    entries[entry[0].toLowerCase()] = entry[1];
                }
            });

            var count = entries['numberofentries'];
            var urls = [];
            for (var i=1; i<=count; i++) {
                var url = entries['file' + i];
                urls.push(url);
            }

            return urls;
        }
    }
)
.factory("PlaylistTransform",
    function () {
        return function (data) {
            var x2js = new X2JS();
            var json = x2js.xml_str2json( data );

            var parsedSongs = [],
                songs = json.songs.song;

            angular.forEach(songs, function (song) {
                var parsedSong = {};
                angular.forEach(song, function (prop, key) {
                    if (key === "date") {
                        parsedSong[key] = new Date(parseInt(prop)*1000);
                    } else {
                        parsedSong[key] = prop.toString();
                    }
                });
                parsedSongs.push(parsedSong);
            });
            return parsedSongs;
        }
    }
);