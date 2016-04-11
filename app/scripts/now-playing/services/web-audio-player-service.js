'use strict';

angular.module('somafmPlayerApp')
  .factory('WebAudioPlayerService', [
    '$q', '$rootScope', 'AppURLs', 'StationService', 'StorageService', 'DetectorService', 'Audio', 'AudioContext',
    function ($q, $rootScope, AppURLs, StationService, StorageService, DetectorService, Audio, AudioContext) {

      var self = {
        audioHolder: null,
        audio: null,
        context: null,
        howl: null,
        volumeKey: 'volume',
        lastVolume: null,
        currentTime: 0
      };

      var createStreamSource = function (type, url) {
        var source = document.createElement('source');
        source.src = url;
        return source;
      };

      var loadStreams = function (station) {
        angular.element(self.audio).html('');
        var typeArray = DetectorService.getAudioTypeArray(self.audio);
        var qualityArray = DetectorService.getAudioQualityArray();

        _.each(qualityArray, function (quality) {
          _.each(typeArray, function (type) {
            var primaryUrl = AppURLs.streams.urls.primary
              .replace(AppURLs.streams.qualityKey, quality)
              .replace(AppURLs.streams.typeKey, type)
              .replace(AppURLs.streams.stationKey, station.id);

            self.audio.appendChild(createStreamSource(type, primaryUrl));

            var alternateUrl = AppURLs.streams.urls.alternate
              .replace(AppURLs.streams.qualityKey, quality)
              .replace(AppURLs.streams.typeKey, type)
              .replace(AppURLs.streams.stationKey, station.id);

            self.audio.appendChild(createStreamSource(type, alternateUrl));
          })
        });
        self.audio.load();
      };

      var playStream = function (station) {
        self.audio.play();
        station.playing = true;

        //var analyser = self.context.createAnalyser();
        //var source = self.context.createMediaElementSource(self.audio);
        //source.connect(analyser);
        //analyser.connect(self.context.destination);
      };

      var play = function (station) {
        return $q(function (resolve, reject) {
          if ($rootScope.playingStation) $rootScope.playingStation.playing = false;
          loadStreams(station);
          playStream(station);
          $rootScope.playingStation = station;
          resolve($rootScope.playingStation);
        });
      };

      var isPlaying = function (station) {
        return $rootScope.playingStation && $rootScope.playingStation === station ? station.playing : null;
      };

      var stop = function () {
        return $q(function (resolve) {
          $rootScope.playingStation.playing = false;
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
        self.audio.autoplay = true;

        //Android-Chrome play delay: https://www.internet-radio.com/community/threads/very-slow-buffering-in-android.20139/

        self.audioHolder[0].appendChild(self.audio);

        //self.context = new AudioContext();

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
