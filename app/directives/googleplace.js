/**
 * Created by nilagor on 14.09.2015.
 * Directive for input with Google Places Autocomplete
 */
module.exports = function () {
    return {
        restrict: 'E',
        scope: {
            options: '=',
            types: '@',
            onChoose: '&'
        },
        template: '<input type="text">',
        link: function (scope, element) {
            var input = element[0].querySelector('input');
            var options = angular.extend({
                types: scope.types.split(",") || ['(cities)']
            }, scope.options);

            scope.gPlace = new google.maps.places.Autocomplete(input, options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
                scope.onChoose({place: scope.gPlace.getPlace()});
                input.value = '';
            });
        }
    };
};