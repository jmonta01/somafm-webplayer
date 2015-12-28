'use strict';

angular.module('somafmPlayerApp')
  .factory("PlsTransform", [
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
  ]);
