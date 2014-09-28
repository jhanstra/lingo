'use strict';
var angular = require('angular');
var angular_route = require('angular-route');
var $ = require('jquery');
require('./directives/main');
// var data = require('./data.js');
// var angular_resource = require('angular-resource');




var app = angular.module('crowdefine', [
  'firebase',
  'ngRoute',
  'ngResource',
  'crowdefine.directives'
]);
app.factory('Definition', require('./services/definition'));
app.factory('Word', require('./services/word'));
app.controller('MainCtrl', ['$rootScope','$scope', require('./controllers/maincontroller')]);
app.controller('SidebarCtrl', ['$rootScope','$scope','$location', require('./controllers/sidebarcontroller')]);
app.controller('MyDictionaryCtrl', ['$rootScope','$scope','$location','Definition','Word', require('./controllers/mycontroller')]);
app.controller('GlobalDictionaryCtrl', ['$rootScope','$scope', require('./controllers/globalcontroller')]);
app.controller('WordCtrl', ['$rootScope','$scope','$location','Definition','Word', require('./controllers/wordcontroller')]);



app.config(function($routeProvider) {
  $routeProvider
  .when('/', { templateUrl: 'views/my-dictionary.html' })
  .when('/global', { templateUrl: 'views/global-dictionary.html' })
  .when('/profile', { templateUrl: 'views/profile.html' })
  .when('/words', { templateUrl: 'views/word-center.html'})
  .otherwise({ redirectTo: '/' });

});

app.constant('FIREBASE_URL', 'https://crowdefine.firebaseio.com/');
