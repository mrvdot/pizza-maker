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
  .module('pizzaMakerApp', [
    'ngCookies',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
