'use strict';

var angular = require('angular');
var $ = require('jquery');

var app = angular.module('crowdefine',[]);

app.controller('MainCtrl', ['$scope', require('./controllers/maincontroller')]);
