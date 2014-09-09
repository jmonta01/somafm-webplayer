'use strict';

angular.module('somafmPlayerApp')
    .factory('CommunityService', [ '$http', '$q', '$log', 'AppURLs',
        function ($http, $q, $log, AppURLs) {

            var loadNews = function () {
                var deferred = $q.defer();
                $http.get(AppURLs.news.url, {}).
                    success(function (response) {
                        deferred.resolve(response);
                    }).
                    error(function (response) {
                        $log.error("Station list couldn't be loaded", response);
                        deferred.resolve(null);
                    });
                return deferred.promise;
            };

            var loadTwitter = function () {
                var deferred = $q.defer();
                $http.get("", {}).
                    success(function (response) {
                        deferred.resolve(response);
                    }).
                    error(function (response) {
                        $log.error("Station list couldn't be loaded", response);
                        deferred.resolve(null);
                    });
                return deferred.promise;
            };

            var loadFlickr = function () {
                var deferred = $q.defer();
                $http.get("", {}).
                    success(function (response) {
                        deferred.resolve(response);
                    }).
                    error(function (response) {
                        $log.error("Station list couldn't be loaded", response);
                        deferred.resolve(null);
                    });
                return deferred.promise;
            };

            var loadFacebook = function () {
                var deferred = $q.defer();
                $http.get("", {}).
                    success(function (response) {
                        deferred.resolve(response);
                    }).
                    error(function (response) {
                        $log.error("Station list couldn't be loaded", response);
                        deferred.resolve(null);
                    });
                return deferred.promise;
            };

            return {
                loadNews: loadNews,
                loadTwitter: loadTwitter,
                loadFlickr: loadFlickr,
                loadFacebook: loadFacebook
            }
        }
    ]);