'use strict';

describe('Controller: FavSongsCtrl', function () {

    // load the controller's module
    beforeEach(module('somafmPlayerApp'));

    var FavSongsCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        FavSongsCtrl = $controller('FavSongsCtrl', {
            $scope: scope
        });
    }));

    it('should have some data to test', function () {
        // expect(scope.availableViews).toBeDefined();
    });



});
