'use strict';

describe('Service: FavoriteStationService', function () {

    var service,
        dataService,
        httpBackend,
        $channelsJSON;

    // load the controller's module
    beforeEach(function () {
        module('somafmPlayerApp', 'mockData');

        inject(function (FavoriteStationService, StationService, $httpBackend, channelsJSON) {
            service = FavoriteStationService;
            dataService = StationService;
            dataService.parseXML(false);
            httpBackend = $httpBackend;
            $channelsJSON = channelsJSON;
        })

    });

    // make sure no expectations were missed in your tests.
    // (e.g. expectGET or expectPOST)
    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });


    it('should be able to get all fav stations', function () {
        expect(service.get).toBeDefined();
    });

    it('should be able to clear all fav stations', function () {
        expect(service.clear).toBeDefined();
    });

    it('should be able to add a station as a fav', function () {
        expect(service.add).toBeDefined();
        expect(service.get).toBeDefined();

        var savedStations, station;

        expect(dataService.getAllStations).toBeDefined();
        httpBackend.expectGET("/data/channels.xml").respond($channelsJSON);
        dataService.getAllStations()
            .then(function (data) {
                expect(data).toEqual($channelsJSON);

                service.clear();
                station = data.query[0];
                service.add(station);
            });
        httpBackend.flush();

        savedStations = service.get();
        expect(savedStations.length).toBe(1);
        expect(savedStations.indexOf(station._id)).toBeGreaterThan(-1);

    });


    it('should be able to remove a station as a fav', function () {
        expect(service.remove).toBeDefined();
        expect(service.get).toBeDefined();

        var savedStations, station;

        expect(dataService.getAllStations).toBeDefined();
        httpBackend.expectGET("/data/channels.xml").respond($channelsJSON);
        dataService.getAllStations()
            .then(function (data) {
                expect(data).toEqual($channelsJSON);

                service.clear();
                station = data.query[0];
                service.add(station);
            });
        httpBackend.flush();

        savedStations = service.get();
        expect(savedStations.length).toBe(1);
        expect(savedStations.indexOf(station._id)).toBeGreaterThan(-1);

        service.remove(station);
        savedStations = service.get();

        expect(savedStations.length).toBe(0);
        expect(savedStations.indexOf(station._id)).toBe(-1);
    });

});

describe('Service: FavoriteSongService', function () {

    // load the controller's module
    beforeEach(module('somafmPlayerApp'));

    var service;

    // Initialize the controller and a mock scope
    beforeEach(inject(function (FavoriteSongService) {
        service = FavoriteSongService;
    }));


    it('should be able to get all fav songs', function () {
        expect(service.get).toBeDefined();
    });

    it('should be able to clear all fav songs', function () {
        expect(service.clear).toBeDefined();
    });

    it('should be able to add a song as a fav', function () {
        expect(service.add).toBeDefined();
        expect(service.get).toBeDefined();
    });

    it('should be able to remove a song as a fav', function () {
        expect(service.remove).toBeDefined();
        expect(service.get).toBeDefined();
    });

});
