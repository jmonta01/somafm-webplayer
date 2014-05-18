'use strict';

describe('Controller: MainCtrl', function () {

    var MainCtrl,
        scope,
        location,
        service,
        httpBackend,
        selectedStationID = "groovesalad",
        $channelsJSON,
        $channelJSON,
        $plsJSON,
        $stationPlayListJSON;


    // load the controller's module
    beforeEach(function () {
        module('somafmPlayerApp', 'mockData');

        inject(function ($controller, $rootScope, StationService, $httpBackend, channelsJSON, channelJSON, plsJSON, stationPlayListJSON) {
            scope = $rootScope.$new();
            MainCtrl = $controller('MainCtrl', {
                $scope: scope
            });

            service = StationService;
            service.parseXML(false);
            httpBackend = $httpBackend;
            $channelsJSON = channelsJSON;
            $channelJSON = channelJSON;
            $plsJSON = plsJSON;
            $stationPlayListJSON = stationPlayListJSON;

        });
        scope.$apply();
    });

    // make sure no expectations were missed in your tests.
    // (e.g. expectGET or expectPOST)
    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });


    it('should have a list of available views with at least one view', function () {
        expect(scope.availableViews).toBeDefined();
        expect(scope.availableViews.length).toBeGreaterThan(0);
    });

    it('should have a toggle for showing the global nav', function () {
        expect(scope.showGlobalNav).toBeDefined();
        scope.showGlobalNav = true;
        expect(scope.showGlobalNav).toBeTruthy();
    });

    it('should have a toggle for showing player controls', function () {
        expect(scope.showPlayerControls).toBeDefined();
        scope.showPlayerControls = true;
        expect(scope.showPlayerControls).toBeTruthy();
    });


    it('should have a method for switching views', function () {
        var oldView = scope.availableViews[0];
        var newView = scope.availableViews[1];
        scope.selectedView = oldView;
        scope.changeViewTo(newView);
        expect(scope.selectedView).toBe(newView);
    });

    it('should be able to start playing a station', function () {
        expect(scope.selectedStation).toBe(null);

        httpBackend.expectGET("/data/channels.xml").respond($channelsJSON);
        httpBackend.expectGET("/data/groovesalad.pls").respond($plsJSON);

        var station;

        spyOn(scope, 'changeViewTo');

        service.getAllStations()
            .then(function (data) {
                station = data.query[0];
                scope.playStation(station);
            });
        httpBackend.flush();

        expect(scope.selectedStation).toBe(station);
        expect(scope.selectedStation.urls).toBeDefined();
        expect(scope.selectedStation.urls).toEqual($plsJSON);
        expect(scope.showPlayerControls).toBeTruthy()
        expect(scope.changeViewTo).toHaveBeenCalled();
    });


    it('should be able to stop playing a station', function () {
        expect(scope.stopStation).toBeDefined();
        scope.stopStation();
        expect(scope.selectedStation).toBe(null);
        expect(scope.showPlayerControls).toBeFalsy();
    });

    it('should be able to toggle the fav state of a station', function () {

        httpBackend.expectGET("/data/channels.xml").respond($channelsJSON);

        var station;

        spyOn(scope, 'changeViewTo');

        service.getAllStations()
            .then(function (data) {
                station = data.query[0];
            });
        httpBackend.flush();

        expect(station.favorite).toBeUndefined();
        scope.toggleFavStation(station);
        expect(station.favorite).toBe(true);
    });

});
