'use strict';

angular.module('somafmPlayerApp')
  .controller('MainCtrl', [
    '$scope', '$state', 'PlayerService',
    function ($scope, $state, PlayerService) {
      var self = this;
      self.config = {
        largeHeader: false,
        hasPlayer: false
      };

      $scope.$watch(
        function () {
          return $state.current;
        },
        function (state) {
          if (state.data) {
            self.config.largeHeader = state.data.largeHeader;
          }
        }
      );

      $scope.$watch(
        function () {
          return PlayerService.getPlayingStation();
        },
        function (playingStation) {
          self.config.hasPlayer = playingStation != null;
        }
      );


    }
  ]);
