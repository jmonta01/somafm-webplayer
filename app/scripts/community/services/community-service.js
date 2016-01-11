'use strict';

angular.module('somafmPlayerApp')
  .factory('CommunityService', [
    '$http', '$log', '$q', 'AppURLs', 'NewsTransform',
    function ($http, $log, $q, AppURLs, NewsTransform) {
      var parseData = true;

      var loadNews = function () {
        return $q(function (resolve, reject) {
          var opts = {};
          if (parseData) {
            opts['transformResponse'] = NewsTransform;
          }
          $http.get(AppURLs.news.url, opts).
            success(function (result) {
              resolve(result);
            }).
            error(function (error) {
              $log.error("News couldn't be loaded", error);
              reject(error);
            });
        });
      };

      var loadTwitter = function () { //not used yet
        return $q(function (resolve, reject) {
          $http.get("", {}).
            success(function (result) {
              resolve(result);
            }).
            error(function (error) {
              $log.error("Station list couldn't be loaded", error);
              reject(error);
            });
        });
      };

      var loadFlickr = function () {
        return $q(function (resolve, reject) {
          $http.jsonp("http://api.flickr.com/services/feeds/photos_public.gne?id=89961858@N00&lang=en-us&format=json&jsoncallback=?").
            success(function (result) {
              resolve(result);
            }).
            error(function (error) {
              $log.error("Flickr feed couldn't be loaded", error);
              reject(error);
            });

        });
      };

      var loadFacebook = function () { //not used yet
        return $q(function (resolve, reject) {
          $http.get("", {}).
            success(function (result) {
              resolve(result);
            }).
            error(function (error) {
              $log.error("Facebook feed couldn't be loaded", error);
              reject(error);
            });
        });
      };

      return {
        loadNews: loadNews,
        loadTwitter: loadTwitter,
        loadFlickr: loadFlickr,
        loadFacebook: loadFacebook
      }
    }
  ]);
