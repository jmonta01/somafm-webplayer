'use strict';

describe('Controller: NowPlayingCtrl', function () {

    var NowPlayingCtrl,
        scope,
        service,
        httpBackend,
        $channelsJSON,
        $stationPlayListJSON;


    // load the controller's module
    beforeEach(function () {
        module('somafmPlayerApp', 'mockData');

        inject(function ($controller, $rootScope, StationService, $httpBackend, channelsJSON, stationPlayListJSON) {

            service = StationService;
            service.parseXML(false);
            httpBackend = $httpBackend;
            $channelsJSON = channelsJSON;
            $stationPlayListJSON = stationPlayListJSON;

            scope = $rootScope.$new();
            NowPlayingCtrl = $controller('NowPlayingCtrl', {
                $scope: scope,
                StationService: service
            });

        });
    });

    // make sure no expectations were missed in your tests.
    // (e.g. expectGET or expectPOST)
    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should be able to load a playlist of songs from the currently selected station', function () {
        expect(scope.playList).toBeDefined();

        httpBackend.expectGET("/data/channels.xml").respond($channelsJSON);
        httpBackend.expectGET("/data/groovesalad.xml").respond($stationPlayListJSON);

        service.getAllStations()
            .then(function (data) {
                var station = data[0];
                if (station) {
                    scope.getPlayList(station)
                }
            });
        httpBackend.flush();

        //due to the favorite injection, we must inspect the contents instead of the object itself
        expect(scope.playList[0].album).toEqual($stationPlayListJSON[0].album);
        expect(scope.playList[1].album).toEqual($stationPlayListJSON[1].album);

        expect(scope.playList[0].artist).toEqual($stationPlayListJSON[0].artist);
        expect(scope.playList[1].artist).toEqual($stationPlayListJSON[1].artist);

        expect(scope.playList[0].title).toEqual($stationPlayListJSON[0].title);
        expect(scope.playList[1].title).toEqual($stationPlayListJSON[1].title);
    });

    it('should be able to toggle if song is favorite', function () {
        httpBackend.expectGET("/data/channels.xml").respond($channelsJSON);
        httpBackend.expectGET("/data/groovesalad.xml").respond($stationPlayListJSON);

        service.getAllStations()
            .then(function (data) {
                var station = data[0];
                if (station) {
                    scope.getPlayList(station)
                }
            });
        httpBackend.flush();

        var song = scope.playList[0];
        song.favorite = false;
        expect(song.favorite).toBe(false);
        scope.toggleFavSong(song);
        expect(song.favorite).toBe(true);
        scope.toggleFavSong(song);
        expect(song.favorite).toBe(false);
    });


});
