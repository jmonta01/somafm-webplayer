'use strict';

describe('Controller: MainCtrl', function () {

    var MainCtrl,
        scope,
        stService,
        plService,
        httpBackend,
        $channelsJSON,
        $channelJSON,
        $plsJSON,
        $stationPlayListJSON;


    // load the controller's module
    beforeEach(function () {
        module('somafmPlayerApp', 'mockData');

        inject(function ($controller, $rootScope, StationService, PlayerService, $httpBackend, channelsJSON, channelJSON, plsJSON, stationPlayListJSON) {
            scope = $rootScope.$new();

            stService = StationService;
            stService.parseXML(false);

            plService = PlayerService;
            plService.$rootScope = $rootScope.$new();

            httpBackend = $httpBackend;
            $channelsJSON = channelsJSON;
            $channelJSON = channelJSON;
            $plsJSON = plsJSON;
            $stationPlayListJSON = stationPlayListJSON;

            MainCtrl = $controller('MainCtrl', {
                $scope: scope,
                StationService: stService,
                PlayerService: plService
            });


        });
    });

    // make sure no expectations were missed in your tests.
    // (e.g. expectGET or expectPOST)
    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });


    it('should have a toggle for showing player controls', function () {
        expect(scope.showPlayerControls).toBeDefined();
        scope.showPlayerControls = true;
        expect(scope.showPlayerControls).toBeTruthy();
    });

    it('should be able to stop playing a station', function () {
        expect(scope.stopStation).toBeDefined();
        scope.stopStation();
        expect(scope.playingStation).toBe(null);
        expect(scope.showPlayerControls).toBeFalsy();
    });

    it('should be able to toggle the fav state of a station', function () {

        var station = $channelsJSON[0];

        expect(station.favorite).toBeUndefined();
        scope.toggleFavStation(station);
        expect(station.favorite).toBe(true);
    });

});
