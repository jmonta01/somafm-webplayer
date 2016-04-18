'use strict';

angular.module('somafmPlayerApp')
  .controller('MainCtrl', [
    '$scope', '$state', 'StationService', 'DetectorService',
    function ($scope, $state, StationService, DetectorService) {
      var self = this;
      self.largeHeader = false;
      self.selectedStation = null;

      $scope.$watch(
        function () {
          return $state.current;
        },
        function (state) {
          if (state.data) {
            self.largeHeader = state.data.largeHeader;
          }
        }
      );

      $scope.$watch(
        function () {
          return StationService.getSelectedStation();
        },
        function (station) {
          self.selectedStation = station;
        }
      );

      $scope.$on('$stateChangeStart', function(e, to, toParams, from) {
        toParams.autoPlay = angular.isDefined(toParams.autoPlay) ?
          toParams.autoPlay : from.name == '' && DetectorService.canAutoPlay();
      });

    }
  ]);
