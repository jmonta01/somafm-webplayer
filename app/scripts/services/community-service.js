'use strict';

angular.module('somafmPlayerApp')
  .factory('CommunityService', [ '$http', '$q', '$log', 'AppURLs', 'NewsTransform',
    function ($http, $q, $log, AppURLs, NewsTransform) {

      var parseData = true;

      var loadNews = function () {
        var deferred = $q.defer();
        var opts = {};
        if (parseData) {
          opts['transformResponse'] = NewsTransform;
        }
        $http.get(AppURLs.news.url, opts).
          success(function (response) {
            deferred.resolve(response);
          }).
          error(function (response) {
            $log.error("News couldn't be loaded", response);
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
        $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?id=89961858@N00&lang=en-us&format=json&jsoncallback=?", function (data) {
          deferred.resolve(data);
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
            $log.error("Flickr feed couldn't be loaded", response);
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
