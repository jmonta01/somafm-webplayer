'use strict';

describe('Controller: NowPlayingCtrl', function () {

    // load the controller's module
    beforeEach(module('somafmPlayerApp'));

    var NowPlayingCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        NowPlayingCtrl = $controller('NowPlayingCtrl', {
            $scope: scope
        });
    }));

    it('should have a playlist of songs from the currently selected station', function () {
        expect(scope.playList).toBeDefined();
    });

    it('should be able to load the historical song list of the currently selected station', function () {
        expect(scope.getPlayList).toBeDefined();
    });

    it('should be able to toggle if song is favorite', function () {
        expect(scope.toggleFavSong).toBeDefined();
    });


});
