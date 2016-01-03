'use strict';

angular.module('somafmPlayerApp')
  .factory('PlayerService', [
    '$q', '$rootScope', 'StationService', 'StorageService',
    function ($q, $rootScope, StationService, StorageService) {

      var self = this;
      self.audioNode = null;
      self.volumeKey = 'volume';
      self.lastVolume = null;
      self.currentTime = 0;

      var loadStreams = function (station) {
        angular.forEach(station.streamUrls.reverse(), function (url) {
          var source = document.createElement('source');
          source.type = self.audioNode.canPlayType('audio/mpeg;') ? 'audio/mpeg' : source.type = 'audio/ogg';
          source.src = url;
          self.audioNode.appendChild(source);
        });
        self.audioNode.load();
      };

      var playStream = function (station) {
        self.audioNode.play();
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

          self.audioNode.pause();

          //self.audioNode.load();
          self.currentTime = 0;

          angular.element(self.audioNode).html("");


          resolve();
        });
      };

      var getVolume = function () {
        return self.audioNode ? self.audioNode.volume : null;
      };

      var initVolume = function () {
        return setVolume(StorageService.get(self.volumeKey) || 0.5)
      };

      var setVolume = function (value) {
        if (getMuted()) setMuted(false);
        self.audioNode.volume = value;
        StorageService.add(self.volumeKey, value);
        return value;
      };

      var toggleMute = function () {
        if (getMuted()) self.lastVolume = self.audioNode.volume;
        self.audioNode.muted = !self.audioNode.muted;
        setVolume(self.audioNode.muted ? 0 : lastVolume);
      };

      var setMuted = function (value) {
        if (getMuted()) self.lastVolume = self.audioNode.volume;
        self.audioNode.muted = value;
        setVolume(value ? 0 : lastVolume);
      };

      var getMuted = function () {
        return self.audioNode ? self.audioNode.muted : null;
      };

      var registerNode = function (audioNode) {
        self.audioNode = audioNode;
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
        registerNode: registerNode
      };
    }
  ]);
