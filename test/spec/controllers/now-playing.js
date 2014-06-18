'use strict';

describe('Controller: NowPlayingCtrl', function () {

    var NowPlayingCtrl,
        scope,
        service,
        httpBackend,
        $channelsJSON,
        $stationPlayListJSON,
        $plsJSON;


    // load the controller's module
    beforeEach(function () {
        module('somafmPlayerApp', 'mockData', 'config');

        inject(function ($controller, $rootScope, AppURLs, StationService, $httpBackend, channelsJSON, stationPlayListJSON, plsJSON) {

            service = StationService;
            service.parseXML(false);
            httpBackend = $httpBackend;
            $channelsJSON = channelsJSON;
            $stationPlayListJSON = stationPlayListJSON;
            $plsJSON = plsJSON;

            httpBackend.expectGET("/data/channels.xml").respond($channelsJSON);
            httpBackend.expectGET("/data/groovesalad.pls").respond($plsJSON);
            httpBackend.expectGET("/data/groovesalad.xml").respond($stationPlayListJSON);

            scope = $rootScope.$new();

            NowPlayingCtrl = $controller('NowPlayingCtrl', {
                $scope: scope,
                StationService: service,
                AppURLs: AppURLs,
                $state: {go: function () {}},
                $stateParams: {stationID: "groovesalad"}
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

    it('should be able to load a playlist of songs from the currently selected station', function () {
        //due to the favorite injection, we must inspect the contents instead of the object itself
        expect(scope.playList[0].album).toEqual($stationPlayListJSON[0].album);
        expect(scope.playList[1].album).toEqual($stationPlayListJSON[1].album);

        expect(scope.playList[0].artist).toEqual($stationPlayListJSON[0].artist);
        expect(scope.playList[1].artist).toEqual($stationPlayListJSON[1].artist);

        expect(scope.playList[0].title).toEqual($stationPlayListJSON[0].title);
        expect(scope.playList[1].title).toEqual($stationPlayListJSON[1].title);
    });

    it('should be able to toggle if song is favorite', function () {
        var song = {};
        song.favorite = false;
        expect(song.favorite).toBe(false);

        scope.toggleFavSong(song);
        expect(song.favorite).toBe(true);

        scope.toggleFavSong(song);
        expect(song.favorite).toBe(false);
    });


});
