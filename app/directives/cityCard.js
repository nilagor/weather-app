/**
 * Created by nilagor on 14.09.2015.
 * Directive for city card
 */

module.exports = function() {
  return {
      restrict: 'E',
      replace: true,
      scope: {
          city: '=',
          onRemove: '&'
      },
      templateUrl: '/templates/city-card.tpl.html'
  }
};