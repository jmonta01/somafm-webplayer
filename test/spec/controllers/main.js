'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('somafmPlayerApp'));

    var MainCtrl,
        scope,
        location;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $location) {
        scope = $rootScope.$new();
        location = $location.$new();
        MainCtrl = $controller('MainCtrl', {
            $scope: scope
        });
    }));

    it('should have a list of available views', function () {
        expect(scope.availableViews).toBeDefined();
    });

    it('should have a method for switching views', function () {
        expect(scope.changeViewto).toBeDefined();
    });

    it('should have a toggle for showing the global nav', function () {
        expect(scope.showGlobalNav).toBeDefined();
    });

    it('should have a toggle for showing player controls', function () {
        expect(scope.showPlayerControls).toBeDefined();
    });

    it('should be able to start playing a station', function () {
        expect(scope.playStation).toBeDefined();
    });

    it('should be able to stop playing a station', function () {
        expect(scope.stopStation).toBeDefined();
    });

    it('should be able to toggle the fav state a station from the stations list', function () {
        expect(scope.toggleFavStation).toBeDefined();
    });


});
