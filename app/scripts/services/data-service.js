'use strict';

angular.module('somafmPlayerApp')
    .factory('StationService', [ '$http', '$log', '$q', 'AppURLs', 'StationTransform', 'PlsTransform', 'PlaylistTransform',
        function ($http, $log, $q, AppURLs, StationTransform, PlsTransform, PlaylistTransform) {

            var parseData = true,
                cachedData = [];

            var getAllStations = function () {
                var deferred = $q.defer();

                if (cachedData.length > 0) {
                    deferred.resolve(cachedData);
                } else {
                    var opts = {};
                    if (parseData) {
                        opts['transformResponse'] = StationTransform;
                    }
                    $http.get(AppURLs.allStations.url, opts).
                        success(function (response) {
                            cachedData = response;
                            deferred.resolve(cachedData);
                        }).
                        error(function (response) {
                            $log.error("Station list couldn't be loaded", response);
                            deferred.resolve(cachedData);
                        });
                }
                return deferred.promise;
            };

            var getStationDetails = function (id) {
                var deferred = $q.defer();
                getAllStations()
                    .then(function (stations) {
                        angular.forEach(stations, function (station) {
                            if (station._id === id) {
                                deferred.resolve(station);
                            }
                        });
                    });
                return deferred.promise;
            };

            var getPls = function (station) {
                var url = AppURLs.pls.url.replace(AppURLs.pls.key, station._id);
                var deferred = $q.defer();
                var opts = {};
                if (parseData) {
                    opts['transformResponse'] = PlsTransform;
                }

                $http.get(url, opts)
                    .success(function(response) {
                        deferred.resolve(response);
                    })
                    .error(function (response) {
                        $log.error("Station PLS couldn't be loaded", response);
                        deferred.resolve(response);
                    });
                return deferred.promise;
            };

            var getStationPlayList = function (station) {
               var url = AppURLs.playList.url.replace(AppURLs.playList.key, station._id);
                var deferred = $q.defer();
                var opts = {};
                if (parseData) {
                    opts['transformResponse'] = PlaylistTransform;
                }
                $http.get(url, opts)
                    .success(function (response) {
                        deferred.resolve(response);
                    })
                    .error(function(response) {
                        $log.error("Station list couldn't be loaded", response);
                        deferred.resolve(response);
                    });
                return deferred.promise;
            };

            return {
                getAllStations: getAllStations,
                getStationByID: getStationDetails,
                getPls: getPls,
                getPlayList: getStationPlayList,
                parseXML: function (val) {
                    parseData = val;
                }
            }
        }
    ]);