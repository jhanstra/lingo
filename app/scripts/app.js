'use strict';
var angular = require('angular');
require('./directives/main');
// var data = require('./data.js');
// var angular_resource = require('angular-resource');
var angular_route = require('angular-route');
// var $ = require('jquery');




var app = angular.module('crowdefine', [
  'firebase',
  'ngRoute',
  'ngResource',
  'crowdefine.directives'
]);
app.constant('FIREBASE_URL', 'https://crowdefine.firebaseio.com/');

app.factory('Definition', ['$firebase','FIREBASE_URL', require('./services/definition')]);
app.factory('Word', ['$firebase', 'FIREBASE_URL', require('./services/word')]);
app.factory('Auth', ['$firebaseSimpleLogin', 'FIREBASE_URL', '$rootScope', require('./services/auth')]);
app.factory('User', ['$firebase', 'FIREBASE_URL', '$rootScope','$log','Auth', require('./services/user')])

app.controller('MainCtrl', ['$rootScope','$scope','$firebase','$location','Auth','User', require('./controllers/maincontroller')]);
app.controller('SidebarCtrl', ['$rootScope','$scope','$location', require('./controllers/sidebarcontroller')]);
app.controller('MyDictionaryCtrl', ['$rootScope','$scope','$location','Definition','Word', require('./controllers/mycontroller')]);
app.controller('GlobalDictionaryCtrl', ['$rootScope','$scope', require('./controllers/globalcontroller')]);
app.controller('WordCtrl', ['$rootScope','$scope','$location','Definition','Word', require('./controllers/wordcontroller')]);
app.controller('AuthCtrl', ['$scope','$location','Auth','User', require('./controllers/authcontroller')]);


app.config(function($routeProvider) {
  $routeProvider
  .when('/', { templateUrl: 'views/my-dictionary.html' })
  .when('/global', { templateUrl: 'views/global-dictionary.html' })
  .when('/profile', { templateUrl: 'views/profile.html' })
  .when('/words', { templateUrl: 'views/word-center.html'})
  .when('/login', { templateUrl: 'views/login.html' })
  .when('/register', { templateUrl: 'views/register.html' })
  .otherwise({ redirectTo: '/' });

});
