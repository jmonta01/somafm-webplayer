'use strict';

angular.module('somafmPlayerApp')
  .factory('StorageService', [ '$q', 'localStorageService',
    function ($q, localStorageService) {

      var rootKey = 'storage.service.';
      var lsFn = localStorageService.isSupported ? localStorageService : localStorageService.cookie;

      var get = function (key, noRoot) {
        return lsFn.get(noRoot ? key : rootKey + key);
      };

      var add = function (key, value, noRoot) {
        lsFn.add(noRoot ? key : rootKey + key, value)
      };

      var remove = function (key, noRoot) {
        return lsFn.remove(noRoot ? key : rootKey + key);
      };


      return {
        add: add,
        get: get,
        remove: remove
      }

    }
  ]);
