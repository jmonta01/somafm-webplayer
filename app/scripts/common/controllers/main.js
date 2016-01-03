'use strict';

angular.module('somafmPlayerApp')
  .controller('MainCtrl', [
    '$rootScope', '$scope', '$state', 'PlayerService',
    function ($rootScope, $scope, $state, PlayerService) {
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

      $rootScope.$watch('playingStation', function (playingStation) {
        self.config.hasPlayer = playingStation != null;
      });


    }
  ]);
