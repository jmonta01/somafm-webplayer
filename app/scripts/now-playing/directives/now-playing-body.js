'use strict';

angular.module('somafmPlayerApp')
  .directive("sfNowPlayingBody", [
    '$q', '$timeout', '$window', '$state', '$stateParams',
    'PlayerService', 'WebAudioPlayerService', 'StationService', 'FavStationsService', 'FavSongsService',
    'POLL_INT', 'SHOP_URI',
    function ($q, $timeout, $window, $state, $stateParams,
              PlayerService, WebAudioPlayerService, StationService, FavStationsService, FavSongsService,
              POLL_INT, SHOP_URI) {
      return {
        restrict :"E",
        replace: true,
        scope: {},
        templateUrl: 'now-playing/body.tpl.html',
        link: function (scope, element, attr) {
          var timer = null;
          scope.songs = [];

          scope.loadSongs  = function () {
            var loadPlaylist = StationService.getStationPlayList($stateParams.stationID);
            var loadFavSongs = FavSongsService.get();
            $q.all([loadPlaylist, loadFavSongs]).then(
              function (results) {
                var playlist = results[0], favSongs = results[1];
                scope.songs = _.map(playlist.songs, function (song) {
                  song.favorite = angular.isDefined(_.findWhere(favSongs, {artist: song.artist, album: song.album, title: song.title}));
                  return song;
                });

                $timeout.cancel(timer);
                timer = $timeout(function () {
                  scope.loadSongs();
                }, POLL_INT);
              }
            );
          };

          scope.toggleFavSong = function (song) {
            FavSongsService.toggle(song);
          };

          scope.shopSong = function (song) {
            var url = SHOP_URI;
            url = url.replace('{ARTIST}', song.artist);
            url = url.replace('{SONG}', song.title);
            $window.open(url);
          };

          scope.$on('$destroy', function() {
            $timeout.cancel(timer);
          });

          console.log($stateParams.autoPlay)

          if ($stateParams.stationID) {
            scope.loadSongs();
            var lastSelectedStation = StationService.getSelectedStation();
            if (!lastSelectedStation || lastSelectedStation.id != $stateParams.stationID) {
              StationService.selectStation($stateParams.stationID).then(
                function (station) {
                  if ($stateParams.autoPlay) {
                    WebAudioPlayerService.play(station);
                  }
                },
                function (error) {
                  console.error(error);
                  $state.go('all-stations');
                }
              );
            } else {
              if ($stateParams.autoPlay) {
                WebAudioPlayerService.play(lastSelectedStation);
              }
            }
          } else {
            $state.go('all-stations');
          }

        }
      }
    }
  ]);
