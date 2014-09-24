'use strict';
var angular = require('angular');
var angular_route = require('angular-route');
// var angular_resource = require('angular-resource');
var $ = require('jquery');
require('./directives/main');
// var data = require('./data.js');



var app = angular.module('crowdefine', [
  'firebase',
  'ngRoute',
  'ngResource',
  'crowdefine.directives'
]);
app.factory('Entry', require('./services/entry'));
app.controller('MainCtrl', ['$scope', require('./controllers/maincontroller')]);
app.controller('MyDictionaryCtrl', ['$scope','Entry', require('./controllers/mycontroller')]);
app.controller('CrowdDictionaryCtrl', ['$scope', require('./controllers/crowdcontroller')]);


app.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/my-dictionary.html'
  })
});

app.constant('FIREBASE_URL', 'https://crowdefine.firebaseio.com/');
