'use strict';

angular.module('somafmPlayerApp')
  .factory("StationTransform", [
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
  ]);
