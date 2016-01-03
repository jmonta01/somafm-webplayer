'use strict';

angular.module('somafmPlayerApp')
  .directive("sfFooter", [
    '$state',
    function ($state) {
      return {
        restrict :"E",
        replace: true,
        scope: {
          config: '='
        },
        templateUrl: 'common/footer.tpl.html',
        link: function (scope, element, attr) {

          scope.isSelected = function (name) {
            return $state.current.name == name;
          }

        }
      }
    }
  ]);
