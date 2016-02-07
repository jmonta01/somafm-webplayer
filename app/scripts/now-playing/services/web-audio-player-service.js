'use strict';

angular.module('somafmPlayerApp')
  .factory('WebAudioPlayerService', [
    '$q', '$rootScope', 'StationService', 'StorageService', 'Audio', 'AudioContext',
    function ($q, $rootScope, StationService, StorageService, Audio, AudioContext) {

      var self = this;
      self.audioHolder = null,
      self.audio = null,
      self.context = null,
      self.howl = null,
      self.volumeKey = 'volume';
      self.lastVolume = null;
      self.currentTime = 0;

      var loadStreams = function (station) {
        angular.forEach(station.streamUrls.reverse(), function (url) {
          var source = document.createElement('source');
          source.type = self.audio.canPlayType('audio/mpeg;') ? 'audio/mpeg' : source.type = 'audio/ogg';
          source.src = url;
          self.audio.appendChild(source);
        });
        self.audio.load();
      };

      var playStream = function (station) {
        self.audio.play();

        //var analyser = self.context.createAnalyser();
        //var source = self.context.createMediaElementSource(self.audio);
        //source.connect(analyser);
        //analyser.connect(self.context.destination);


        station.playing = true;
      };

      var play = function (station) {
        return $q(function (resolve, reject) {
          if ($rootScope.playingStation) $rootScope.playingStation.playing = false;
          if (station.streamUrls != null) {
            loadStreams(station);
            playStream(station);
            $rootScope.playingStation = station;
            resolve($rootScope.playingStation);
          } else {
            StationService.getStationPls(station._id).then(
              function (data) {
                station.streamUrls = data;
                loadStreams(station);
                playStream(station);
                $rootScope.playingStation = station;
                resolve($rootScope.playingStation);
              },
              reject
            );
          }

        });
      };

      var isPlaying = function (station) {
        return $rootScope.playingStation && $rootScope.playingStation === station ? station.playing : null;
      };

      var stop = function () {
        return $q(function (resolve) {
          $rootScope.playingStation.playing = false;

          self.audio.pause();

          //self.audio.load();
          self.currentTime = 0;

          self.audioHolder.html("");

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
        setVolume(self.audio.muted ? 0 : lastVolume);
      };

      var setMuted = function (value) {
        if (getMuted()) self.lastVolume = self.audio.volume;
        self.audio.muted = value;
        setVolume(value ? 0 : lastVolume);
      };

      var getMuted = function () {
        return self.audio ? self.audio.muted : null;
      };


      var init = function (audioNode) {
        self.audioHolder = angular.element(audioNode);

        self.audio = new Audio();
        self.audio.controls = false;
        self.audio.autoplay = true;

        self.audioHolder[0].appendChild(self.audio);

        self.context = new AudioContext();

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
