'use strict';

angular.module('somafmPlayerApp')
  .factory('WebAudioPlayerService', [
    '$q', 'AppURLs', 'StationService', 'StorageService', 'DetectorService', 'Audio', 'AudioContext',
    function ($q, AppURLs, StationService, StorageService, DetectorService, Audio, AudioContext) {

      var self = {
        audioHolder: null,
        audio: null,
        context: null,
        howl: null,
        volumeKey: 'volume',
        lastVolume: null,
        currentTime: 0,
        playingStation: null
      };

      var play = function (station) {
        return $q(function (resolve, reject) {
          loadStreams(station);
          station.playing = true;
          self.station = station;
          self.audio.load();
          self.audio.play();

          //-- For future use (visualizers, audio processing, etc)
          /*
            var analyser = self.context.createAnalyser();
            var source = self.context.createMediaElementSource(self.audio);
            source.connect(analyser);
            analyser.connect(self.context.destination);
          */

          resolve(self.station);
        });
      };

      var loadStreams = function (station) {
        angular.element(self.audio).html('');
        _.each(station.streamUrls, function (streamUrl) {
          if (_.isString(streamUrl.url)) {
            var source = document.createElement('source');
            source.src = streamUrl.url;
            source.type = streamUrl.type;
            self.audio.appendChild(source);
          } else {
            console.error('tried appending', streamUrl);
          }
        });
      };

      var isPlaying = function (station) {
        return self.station && self.station === station ? station.playing : null;
      };

      var stop = function () {
        return $q(function (resolve) {
          self.station.playing = false;
          self.audio.pause();
          self.currentTime = 0;
          angular.element(self.audio).html('');

          resolve();
        });
      };

      var getVolume = function () {
        return self.audio ? self.audio.volume : null;
      };

      var initVolume = function () {
        return setVolume(StorageService.get(self.volumeKey) || 0.5)
      };

      var setVolume = function (value) {
        if (getMuted()) setMuted(false);
        self.audio.volume = value;
        StorageService.add(self.volumeKey, value);
        return value;
      };

      var toggleMute = function () {
        if (getMuted()) self.lastVolume = self.audio.volume;
        self.audio.muted = !self.audio.muted;
        setVolume(self.audio.muted ? 0 : self.lastVolume);
      };

      var setMuted = function (value) {
        if (getMuted()) self.lastVolume = self.audio.volume;
        self.audio.muted = value;
        setVolume(value ? 0 : self.lastVolume);
      };

      var getMuted = function () {
        return self.audio ? self.audio.muted : null;
      };

      var init = function (audioNode) {
        self.audioHolder = angular.element(audioNode);

        self.audio = new Audio();
        self.audio.controls = false;
        self.audio.autoplay = false;
        self.audioHolder[0].appendChild(self.audio);

        //-- For future use (visualizers, audio processing, etc)
        /*
          self.context = new AudioContext();
        */

        initVolume();
      };


      return {
        play: play,
        isPlaying: isPlaying,
        stop: stop,
        initVolume: initVolume,
        setVolume: setVolume,
        getVolume: getVolume,
        setMuted: setMuted,
        toggleMute: toggleMute,
        getMuted: getMuted,
        init: init
      };
    }
  ]);
