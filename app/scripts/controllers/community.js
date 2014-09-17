'use strict';

angular.module('somafmPlayerApp')
  .controller('CommunityCtrl', ['$scope', 'AppURLs',
        function ($scope, AppURLs) {

        $scope.views = AppURLs.community.sections;

        $scope.selectedView = $scope.views[0];

        $scope.show = function (view) {
            $scope.selectedView = view;
        }
    
      }
    ]);
