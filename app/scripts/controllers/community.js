'use strict';

angular.module('somafmPlayerApp')
  .controller('CommunityCtrl', function ($scope) {

        $scope.views = ["news", "twitter", "flickr", "facebook"];

        $scope.selectedView = $scope.views[0];

        $scope.show = function (view) {
            $scope.selectedView = view;
        }
    
  });
