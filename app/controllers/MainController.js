/**
 * Created by nilagor on 14.09.2015.
 * Main controller of app
 */

module.exports = function ($scope, City, _) {
    $scope.cities = [];

    $scope.addPlace = function (place) {
        var newCity = new City(place.name, $scope.refreshInterval);
        newCity.onResolve = function () {
            if ($scope.cities.length === 5) {
                $scope.cities[0].stopUpdate();
                $scope.cities.shift();
            }
            $scope.cities.push(newCity);
        };
        newCity.onError = function () {
            console.log('Something wrong with your city');
        };
    };

    $scope.removeCity = function (city) {
        city.stopUpdate();
        $scope.cities = _.reject($scope.cities, {id: city.id})
    };
};