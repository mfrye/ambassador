'use strict';


// Declare app level module which depends on filters, and services
angular.module('ambassador', ['ambassador.filters', 'ambassador.services', 'ambassador.directives', 'ambassador.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
    $routeProvider.when('/landing/:linkId', {templateUrl: 'partials/landing.html', controller: 'LandingCtrl'});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
