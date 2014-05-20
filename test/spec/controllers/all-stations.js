'use strict';

describe('Controller: AllStationsCtrl', function () {

    var AllStationsCtrl,
        scope,
        service,
        httpBackend,
        $channelsJSON,
        $channelJSON;


    // load the controller's module
    beforeEach(function () {
        module('somafmPlayerApp', 'mockData');

        inject(function ($controller, $rootScope, StationService, $httpBackend, channelsJSON, channelJSON) {

            service = StationService;
            service.parseXML(false);
            httpBackend = $httpBackend;
            $channelsJSON = channelsJSON;
            $channelJSON = channelJSON;

            httpBackend.expectGET("/data/channels.xml").respond($channelsJSON);

            scope = $rootScope.$new();
            AllStationsCtrl = $controller('AllStationsCtrl', {
                $scope: scope,
                StationService: service
            });

            httpBackend.flush();
        });
    });

    // make sure no expectations were missed in your tests.
    // (e.g. expectGET or expectPOST)
    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should have a list of stations loaded at startup', function () {
        expect(scope.stations).toBeDefined();
        expect(scope.stations.length).toBeGreaterThan(0);
    });

    it('should have a default organized list of stations loaded at startup', function () {
        expect(scope.organizedStations).toBeDefined();
        expect(scope.organizedStations.length).toBeGreaterThan(0);
        expect(scope.organizeMethod).toBe(scope.defaultOrganizeMethod);
    });

    it('should be able to load stations from server', function () {
        expect(scope.loadStations).toBeDefined();
        scope.loadStations();

        expect(scope.stations).toBeDefined();
        expect(scope.stations.length).toBeGreaterThan(0);

        expect(scope.organizedStations).toBeDefined();
        expect(scope.organizedStations.length).toBeGreaterThan(0);
    });


    it('stations should be able to be organized by name', function () {
        expect(scope.sortBy).toBeDefined();
        scope.loadStations();
        expect(scope.organizedStations.length).toBe(scope.stations.length);

        //initial sort
        scope.sortBy("name");
        expect(scope.organizeMethod).toBe("name");
        expect(scope.organizeASC).toBe(false);
        expect(scope.organizedStations[0]._id).toBeLessThan(scope.organizedStations[1]._id);

        //reverse sort
        scope.sortBy("name");
        expect(scope.organizeMethod).toBe("name");
        expect(scope.organizeASC).toBe(true);
        expect(scope.organizedStations[0]._id).toBeGreaterThan(scope.organizedStations[1]._id);
    });

    it('stations should be able to be organized by popularity', function () {
        expect(scope.sortBy).toBeDefined();
        scope.loadStations();
        expect(scope.organizedStations.length).toBe(scope.stations.length);

        //initial sort
        scope.sortBy("popularity");
        expect(scope.organizeMethod).toBe("popularity");
        expect(scope.organizeASC).toBe(false);
        expect(scope.organizedStations[0].listeners).toBeLessThan(scope.organizedStations[1].listeners);

        //reverse sort
        scope.sortBy("popularity");
        expect(scope.organizeMethod).toBe("popularity");
        expect(scope.organizeASC).toBe(true);
        expect(scope.organizedStations[0].listeners).toBeGreaterThan(scope.organizedStations[1].listeners);
    });

    it('stations should be able to be organized by genre', function () {
        expect(scope.sortBy).toBeDefined();
        scope.loadStations();
        expect(scope.organizedStations.length).toBe(scope.stations.length);

        //initial sort
        scope.sortBy("genre");
        expect(scope.organizeMethod).toBe("genre");
        expect(scope.organizeASC).toBe(true);
        expect(scope.organizedStations['ambient']).toBeDefined();
        expect(scope.organizedStations['ambient'][0]).toBeDefined(scope.stations[0]);

        //reverse sort
        scope.sortBy("genre");
        expect(scope.organizeMethod).toBe("genre");
        expect(scope.organizeASC).toBe(false);
        expect(scope.organizedStations['lounge']).toBeDefined();
        expect(scope.organizedStations['lounge'][0]).toBeDefined(scope.stations[1]);
    });

});
