'use strict';

angular
    .module('somafmPlayerApp', [
        'ui.router',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'config',
        'LocalStorageModule'
    ])
    .constant('USE_HTML_AUDIO', (function () {
        var elem = document.createElement("audio");

        if( typeof elem.canPlayType == 'function' ) {
            var playable = elem.canPlayType('audio/mpeg');
            if( (playable.toLowerCase() == 'maybe') || (playable.toLowerCase() == 'probably') ) {
                return true;
            }
        }
        return false;
    })())
    .config(['localStorageServiceProvider', function(localStorageServiceProvider){
        localStorageServiceProvider.setPrefix('somafm');
    }])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('all-stations', {
                url: '/all-stations',
                templateUrl: 'views/all-stations.html',
                controller: 'AllStationsCtrl'
            })
            .state('fav-stations', {
                url: '/fav-stations',
                templateUrl: 'views/fav-stations.html',
                controller: 'FavStationsCtrl'
            })
            .state('fav-songs', {
                url: '/fav-songs',
                templateUrl: 'views/fav-songs.html',
                controller: 'FavSongsCtrl'
            })
            .state('community', {
                url: '/community',
                templateUrl: 'views/community.html',
                controller: 'CommunityCtrl'
            })
            .state('now-playing', {
                url: '/now-playing/:stationID',
                templateUrl: 'views/now-playing.html',
                controller: 'NowPlayingCtrl'
            });


        $urlRouterProvider.otherwise('/all-stations');

    });


