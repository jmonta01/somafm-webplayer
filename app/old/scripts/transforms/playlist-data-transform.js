'use strict';

angular.module('somafmPlayerApp')
  .factory("PlaylistTransform",[
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
  ]);
