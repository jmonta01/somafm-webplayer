'use strict';

describe('Service: StationService', function () {

    var service,
        httpBackend,
        selectedStationID = "groovesalad",
        $channelsJSON,
        $channelJSON,
        $plsJSON,
        $stationPlayListJSON;

    // load the server's module
    beforeEach(function() {
        module('somafmPlayerApp', 'mockData');

        // Initialize the service and mock backend
        inject(function (StationService, $httpBackend, channelsJSON, channelJSON, plsJSON, stationPlayListJSON) {
            service = StationService;
            service.parseXML(false);
            httpBackend = $httpBackend;
            $channelsJSON = channelsJSON;
            $channelJSON = channelJSON;
            $plsJSON = plsJSON;
            $stationPlayListJSON = stationPlayListJSON;
        })
    });

    // make sure no expectations were missed in your tests.
    // (e.g. expectGET or expectPOST)
    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should be able to load all stations', function () {
        expect(service.getAllStations).toBeDefined();
        httpBackend.expectGET("/data/channels.xml").respond($channelsJSON);
        service.getAllStations()
            .then(function (data) {
                expect(data).toEqual($channelsJSON);
            });
        httpBackend.flush();
    });

    it('should be able to load a station by id', function () {
        expect(service.getStationByID).toBeDefined();
        httpBackend.expectGET("/data/channels.xml").respond($channelsJSON);
        service.getStationByID(selectedStationID)
            .then(function (data) {
                expect(data).toEqual($channelJSON);
            });
        httpBackend.flush();
    });

    it('should be able to load a pls file', function () {
        expect(service.getPls).toBeDefined();

        httpBackend.expectGET("/data/channels.xml").respond($channelsJSON);
        httpBackend.expectGET("/data/groovesalad.pls").respond($plsJSON);

        service.getAllStations()
            .then(function (data) {
                var station = data[0];
                if (station) {
                    service.getPls(station)
                        .then(function (data) {
                            expect(data).toEqual($plsJSON);
                        });
                }
            });
        httpBackend.flush();

    });

    it('should be able to load a song list', function () {
        expect(service.getPlayList).toBeDefined();

        httpBackend.expectGET("/data/channels.xml").respond($channelsJSON);
        httpBackend.expectGET("/data/groovesalad.xml").respond($stationPlayListJSON);

        service.getAllStations()
            .then(function (data) {
                var station = data[0];
                if (station) {
                    service.getPlayList(station)
                        .then(function (data) {
                            expect(data).toEqual($stationPlayListJSON);
                        });
                }
            });
        httpBackend.flush();
    });


});
