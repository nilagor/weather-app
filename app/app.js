/**
 * Created by nilagor on 14.09.2015.
 */

require('angular');
require('angular-resource');
var googleDirective = require('./directives/googleplace');
var cityDirective = require('./directives/cityCard');
var weather = require('./service/weather');
var city = require('./service/city');
var underscore = require('./service/underscore');
var MainController = require('./controllers/MainController');


var app = angular.module('app', ['ngResource']);
app.service('Weather', ['$resource', weather]);
app.service('City', ['Weather', city]);
app.service('Underscore', underscore)
app.directive('googlePlace', googleDirective);
app.directive('cityCard', cityDirective);

app.controller('MainController', ['$scope', 'City', 'Underscore', MainController]);