'use strict';

angular.module('somafmPlayerApp')
  .controller('MainCtrl', ['$scope', 'FavoritesService', 'PlayerService',
    function ($scope, FavoritesService, PlayerService) {

      $scope.showFavSongs = FavoritesService.isSupported();

      $scope.isSelected = function (id) {
        var el = angular.element(document.getElementById(id));
        return el.hasClass('selected');
      }

    }
  ]);
