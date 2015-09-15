/**
 * Created by nilagor on 14.09.2015.
 */

require('angular');
require('angular-resource');

var app = angular.module('app', ['ngResource']);
app.service('Weather', require('./services/weather'));
app.service('City', require('./services/city'));
app.service('_', require('./services/lodash'));
app.directive('googlePlace', require('./directives/googleplace'));
app.directive('cityCard', require('./directives/cityCard'));

app.controller('MainController', require('./controllers/MainController'));