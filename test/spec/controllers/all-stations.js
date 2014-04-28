'use strict';

describe('Controller: AllStationsCtrl', function () {

    // load the controller's module
    beforeEach(module('somafmPlayerApp'));

    var AllStationsCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        AllStationsCtrl = $controller('AllStationsCtrl', {
            $scope: scope
        });
    }));

    it('should have a list of stations', function () {
        expect(scope.stations).toBeDefined();
    });

    it('stations should be able to be organized by name', function () {
        expect(scope.organizeByName).toBeDefined();
    });

    it('stations should be able to be organized by popularity', function () {
        expect(scope.organizeByName).toBeDefined();
    });

    it('stations should be able to be organized by genre', function () {
        expect(scope.organizeByGenre).toBeDefined();
    });


    it('should be able to load stations from server', function () {
        expect(scope.loadStations).toBeDefined();
    });


});
