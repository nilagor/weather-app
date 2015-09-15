/**
 * Created by nilagor on 14.09.2015.
 * Main controller of app
 */

module.exports = function ($scope, City, _) {
    $scope.cities = [];
    $scope.cityStyle = {
        width: '100%'
    }
    $scope.acOptions = {
        types: ['(cities)']
    };

    $scope.acCallback = function (place) {
        var newCity = new City(place.name);
        newCity.onResolve = function () {
            if ($scope.cities.length === 5) {
                $scope.cities.shift();
            }
            $scope.cities.push(newCity);
        };
        newCity.onError = function () {
            console.log('Something wrong with your city');
        };
    };

    $scope.removeCity = function (removableCity) {
        removableCity.stopUpdate();
        $scope.cities = _.reject($scope.cities, function (city) {
            return city.id === removableCity.id;
        });
    };

    $scope.$watch('cities', function (val) {
        if (!val || val.length === 0) return;
        $scope.cityStyle.width = 100 / $scope.cities.length + '%';
    }, true);
};