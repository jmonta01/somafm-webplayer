'use strict';

angular
    .module('somafmPlayerApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
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
    .config(function ($routeProvider) {
        $routeProvider
            .when('/all-stations', {
                templateUrl: 'views/all-stations.html',
                controller: 'AllStationsCtrl'
            })
             .when('/fav-stations', {
                 templateUrl: 'views/fav-stations.html',
                 controller: 'FavStationsCtrl'
             })
             .when('/fav-songs', {
                 templateUrl: 'views/fav-songs.html',
                 controller: 'FavSongsCtrl'
             })
             .when('/community', {
                 templateUrl: 'views/community.html',
                 controller: 'CommunityCtrl'
             })
             .when('/now-playing', {
                 templateUrl: 'views/now-playing.html',
                 controller: 'NowPlayingCtrl'
             })
            .otherwise({
                redirectTo: '/all-stations'
            });
    });


