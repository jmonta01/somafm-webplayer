'use strict';

angular.module('somafmPlayerApp')
  .factory('DetectorService', [
    'deviceDetector', 'Audio',
    function (deviceDetector, Audio) {

      var audioEl = new Audio(),
        mobileOsList = [
        'ios', 'android', 'windows-phone'
        ],
        formats = [
          { codec: 'audio/aac', key: 'aacp'},
          { codec: 'audio/mpeg', key: 'mp3' }
        ],
        blacklist = {
          'android': ['aacp']
        };

      var getAudioQualityArray = function () {
        return mobileOsList.indexOf(deviceDetector.os) > -1 ? ['low', 'high', 'highest'] : ['highest', 'high', 'low'];
      };

      var canAutoPlay = function () {
        return mobileOsList.indexOf(deviceDetector.os) == -1;
      };

      var getAudioFormatArray = function (audio) {
        return _.chain(formats)
          .filter(function (format) {
            var browserCanPlay = audioEl.canPlayType(format.codec) == 'probably' || audioEl.canPlayType(format.codec) == 'maybe';
            var isOnBlacklist = blacklist.hasOwnProperty(deviceDetector.os) ? blacklist[deviceDetector.os].indexOf(format.key) > -1 : false;
            return browserCanPlay && !isOnBlacklist;
          })
          .value();
      };

      return {
        getAudioQualityArray: getAudioQualityArray,
        getAudioFormatArray: getAudioFormatArray,
        canAutoPlay: canAutoPlay
      }

    }
  ]);
