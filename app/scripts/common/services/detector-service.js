'use strict';

angular.module('somafmPlayerApp')
  .factory('DetectorService', [
    'deviceDetector',
    function (deviceDetector) {

      var mobileOsList = ['ios', 'android', 'windows-phone'];
      var types = [
        { codec: 'audio/aac', key: 'aac' },
        { codec: 'audio/mpeg', key: 'mp3' }
      ];

      var getAudioQualityArray = function () {
        return mobileOsList.indexOf(deviceDetector.os) > -1 ? ['32', '64', '128'] : ['128', '64', '32'];
      };

      var getAudioTypeArray = function (audio) {
        return _.chain(types)
          .filter(function (type) {
            return audio.canPlayType(type.codec) == 'probably';
          })
          .pluck('key')
          .value();
      };



      return {
        getAudioQualityArray: getAudioQualityArray,
        getAudioTypeArray: getAudioTypeArray
      }

    }
  ]);
