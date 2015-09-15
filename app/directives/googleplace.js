/**
 * Created by nilagor on 14.09.2015.
 * Directive for input with Google Places Autocomplete
 */
module.exports = function () {
    return {
        restrict: 'E',
        scope: {
            options: '=',
            onChose: '&'
        },
        template: '<input type="text">',
        link: function (scope, element) {
            var input = element[0].querySelector('input');
            scope.gPlace = new google.maps.places.Autocomplete(input, scope.options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
                scope.onChose({place: scope.gPlace.getPlace()});
                input.value = '';
            });
        }
    };
};