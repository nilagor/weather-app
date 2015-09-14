/**
 * Created by vrog on 14.09.2015.
 */
module.exports = function($resource) {
  return $resource('http://api.openweathermap.org/data/2.5/weather');
};