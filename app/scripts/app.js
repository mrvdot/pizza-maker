(function (angular) {
  'use strict';

/**
 * @ngdoc overview
 * @name pizzaMakerApp
 * @description
 * # pizzaMakerApp
 *
 * Main module of the application.
 */
angular
  .module('pizzaMaker', [
    'ngCookies',
    'ngAnimate',
    'btorfs.multiselect'
  ]);
})(angular);