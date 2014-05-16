'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('somafmPlayerApp'));

    var MainCtrl,
        scope,
        location,
        mockStation;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
            $scope: scope
        });
        mockStation = {
            _id: "groovesalad",
            description: "A nicely chilled plate ...empo beats and grooves.",
            dj: "Rusty Hodge",
            djmail: "rusty@somafm.com",
            fastpls: "http://somafm.com/groov...m.com/groovesalad64.pls",
            genre: "ambient|electronica",
            highestpls: "http://somafm.com/groovesalad130.pls",
            image: "http://somafm.com/img/groovesalad120.png",
            largeimage: "http://somafm.com/logos/256/groovesalad256.png",
            lastPlaying: "United Future Organization - The Sixth Sense",
            listeners: "1836",
            slowpls: "http://somafm.com/groov...m.com/groovesalad32.pls",
            title: "Groove Salad",
            twitter: "groovesalad",
            updated: "1396147984",
            xlimage: "http://somafm.com/logos/512/groovesalad512.png",
            favorite: false
        };
    }));

    it('should have a list of available views with at least one view', function () {
        expect(scope.availableViews).toBeDefined();
        expect(scope.availableViews.length).toBeGreaterThan(0);
    });

    it('should have a method for switching views', function () {
        var newView = scope.availableViews[0];
        scope.changeViewTo(newView);
        expect(scope.selectedView).toBe(newView);
    });

    it('should be able to toggle the fav state of a station', function () {
        expect(mockStation.favorite).toBe(false);
        scope.toggleFavStation(mockStation);
        expect(mockStation.favorite).toBe(true);
    });

    it('should be able to start playing a station', function () {
        expect(scope.selectedStation).toBe(null);
        scope.playStation(mockStation);
//        need to test asynchronously
//        expect(scope.selectedStation).toBe(mockStation);
    });
//
//    it('should be able to stop playing a station', function () {
//        expect(scope.stopStation).toBeDefined();
//    });

    it('should have a toggle for showing the global nav', function () {
        expect(scope.showGlobalNav).toBeDefined();
    });

    it('should have a toggle for showing player controls', function () {
        expect(scope.showPlayerControls).toBeDefined();
    });

//
//    it('should be able to toggle the fav state a station from the stations list', function () {
//        expect(scope.toggleFavStation).toBeDefined();
//    });


});
