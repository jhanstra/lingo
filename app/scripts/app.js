'use strict';
var angular = require('angular');
require('./directives/main');
var angular_route = require('angular-route');
var ngStorage = require('ng-storage');




var app = angular.module('lingo', [
  'firebase',
  'ngRoute',
  'ngResource',
  'ngStorage',
  'lingo.directives'
]);

// CONSTANTS
app.constant('FIREBASE_URL', 'https://lingo-app.firebaseio.com/');

// FACTORIES
app.factory('Definition', ['$firebase','FIREBASE_URL', require('./services/definition')]);
app.factory('Word', ['$firebase', 'FIREBASE_URL', require('./services/word')]);
app.factory('Auth', ['$firebase', '$firebaseAuth', 'User', '$location', 'FIREBASE_URL', '$rootScope','$localStorage', require('./services/auth')]);
app.factory('User', ['$firebase', 'FIREBASE_URL', '$rootScope','$localStorage', require('./services/user')]);


// CONTROLLERS
app.controller('MainCtrl', ['$rootScope','$scope','$firebase','$location','Auth','User','Word','Definition','$localStorage','FIREBASE_URL', require('./controllers/maincontroller')]);
app.controller('SidebarCtrl', ['$rootScope','$scope','$location', require('./controllers/sidebarcontroller')]);
//app.controller('AddCtrl', ['$rootScope','$scope','$location','Definition','Word','User', require('./controllers/addcontroller')]);
app.controller('MyDictionaryCtrl', ['$rootScope','$scope','$location','Definition','Word','User', require('./controllers/mycontroller')]);
app.controller('GlobalDictionaryCtrl', ['$rootScope','$scope','Definition','$firebase','FIREBASE_URL', require('./controllers/globalcontroller')]);
app.controller('WordCtrl', ['$rootScope','$scope','$location','Definition','Word', require('./controllers/wordcontroller')]);
app.controller('AuthCtrl', ['$rootScope','$scope','$location','Auth','User', require('./controllers/authcontroller')]);


// CONFIG
app.config(function($routeProvider) {
  $routeProvider
  .when('/', { templateUrl: 'views/my-dictionary.html' })
  .when('/global', { templateUrl: 'views/global-dictionary.html' })
  .when('/profile', { templateUrl: 'views/profile.html' })
  .when('/words', { templateUrl: 'views/word-center.html'})
  .when('/signin', { templateUrl: 'views/sign-in.html' })
  .otherwise({ redirectTo: '/' });

});
