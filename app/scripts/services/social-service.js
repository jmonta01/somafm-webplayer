'use strict';

angular.module('somafmPlayerApp')
    .factory('TwitterService', [ '$log',
        function ($log) {

            var getStream = function () {
                var deferred = $q.defer();

                if (cachedData.length > 0) {
                    deferred.resolve(cachedData);
                } else {
                    var opts = {};

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

            return {
                getStream: getStream
            }
        }
    ]);


angular.module('somafmPlayerApp')
    .factory('FlckrService', [ '$log',
        function ($log) {

            return {
            }
        }
    ]);


angular.module('somafmPlayerApp')
    .factory('FacebookService', [ '$log',
        function ($log) {

            return {
            }
        }
    ]);