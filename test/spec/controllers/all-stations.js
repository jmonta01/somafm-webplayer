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

    iit('should have a list of stations loaded at startup', function () {
        expect(scope.stations.query).toBeDefined();
        expect(scope.stations.query.length).toBeGreaterThan(0);
    });

    iit('should have a default organized list of stations loaded at startup', function () {
        expect(scope.organizedStations.query).toBeDefined();
        expect(scope.organizedStations.query.length).toBeGreaterThan(0);
        expect(scope.organizeMethod).toBe(scope.defaultOrganizeMethod);
    });

    iit('should be able to load stations from server', function () {
        httpBackend.expectGET("/data/channels.xml").respond($channelsJSON);
        scope.loadStations();
        httpBackend.flush();

        expect(scope.stations.query).toBeDefined();
        expect(scope.stations.query.length).toBeGreaterThan(0);

        expect(scope.organizedStations.query).toBeDefined();
        expect(scope.organizedStations.query.length).toBeGreaterThan(0);
    });



//    it('stations should be able to be organized by name', function () {
//        expect(scope.organizeByName).toBeDefined();
//    });

//    it('stations should be able to be organized by popularity', function () {
//        expect(scope.organizeByName).toBeDefined();
//    });
//
//    it('stations should be able to be organized by genre', function () {
//        expect(scope.organizeByGenre).toBeDefined();
//    });



});
