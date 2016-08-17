(function (angular) {
'use strict';

angular.module('pizzaMaker')
  // Minimal shim around cookies, implemented as factory so we can easily shift to
  // API or other data storage with minimal changes to the rest of the app
  .factory('data', function ($cookies) {
    return {
      // Retreive data stored in cookies. Pass true for asString to force return as string
      get: function (key, asString) {
        return asString ? $cookies.get(key) : $cookies.getObject(key);
      },
      // Set data for a specific key
      set: function (key, value, opts) {
        if (angular.isString(value)) {
          $cookies.put(key, value, opts);
        } else {
          $cookies.putObject(key, value, opts);
        }
        return this;
      },
      // Remove data by key
      remove: function (key, opts) {
        $cookies.remove(key, opts);
        return this;
      },
      // Generate a unique ID, optionally prefixed
      // For prototype, simply use timestamp
      uniqueId: function (prefix) {
        return (prefix || '') + Date.now();
      }
    }
  });
})(angular);