/**
 * Created by nilagor on 14.09.2015.
 * Angular service for weather service api
 */
module.exports = function ($resource) {
    return $resource('http://api.openweathermap.org/data/2.5/weather');
};