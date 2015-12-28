'use strict';

angular.module('somafmPlayerApp')
  .controller('MainCtrl', [
    '$rootScope', '$state',
    function ($rootScope, $state) {
      var self = this;
      self.config = {
        largeHeader: false
      };

      $rootScope.$watch(
        function () {
          return $state.current;
        },
        function (state) {
          if (state.data) {
            self.config.largeHeader = state.data.largeHeader;
          }
        }
      )


    }
  ]);
