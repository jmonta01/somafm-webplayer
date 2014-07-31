'use strict';

angular.module('somafmPlayerApp')
    .controller('MainCtrl', ['$scope', 'FavoriteSongService', 'PlayerService',
        function ($scope, FavoriteSongService, PlayerService) {

            $scope.showFavSongs = FavoriteSongService.isSupported();

            $scope.isSelected = function (id) {
                var el = angular.element(document.getElementById(id));
                return el.hasClass('selected');
            }

        }
    ]);
