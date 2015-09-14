/**
 * Created by vrog on 14.09.2015.
 */

var template = require('../templates/cityCard.html');

module.exports = function() {
  return {
      restrict: 'E',
      replace: true,
      scope: {
          city: '=',
          cityStyle: '='
      },
      template: template,
      link: function($scope) {

      }
  }
};