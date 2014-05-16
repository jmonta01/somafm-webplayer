'use strict';

describe('Controller: FavStationsCtrl', function () {

    // load the controller's module
    beforeEach(module('somafmPlayerApp'));

    var FavStationsCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        FavStationsCtrl = $controller('FavStationsCtrl', {
            $scope: scope
        });
    }));

    it('should have a list of favorite stations', function () {
        expect(scope.stations).toBeDefined();
        expect(scope.organizedStations).toBeDefined();
    });

    it('should be able to load fav stations from cookie', function () {
        expect(scope.getStations).toBeDefined();
    });

    it('should be able to add station to favs', function () {
        expect(scope.addStation).toBeDefined();
    });

    it('should be able to remove station from favs', function () {
        expect(scope.removeStation).toBeDefined();
    });

    it('should be able to return if provided station is a fav', function () {
        expect(scope.isStationAFav).toBeDefined();
    });



});
