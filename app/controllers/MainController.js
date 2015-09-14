

module.exports = function($scope, City) {
	$scope.cities = [];
	$scope.cityStyle = {
		width: '100%'
	}
	$scope.acOptions = {
		types: ['(cities)']
	};

	$scope.acCallback = function(place) {
		var newCity = new City(place.name);
		newCity.onResolve = function() {
			$scope.cityStyle.width = 100 / ($scope.cities.length + 1) + '%';
			$scope.cities.push(newCity);
		};
		newCity.onError = function() {
			console.log('Something wrong with your city');
		};
	};

}