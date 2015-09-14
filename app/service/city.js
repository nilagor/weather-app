/**
 * Created by vrog on 14.09.2015.
 */
module.exports = function (Weather) {

    function City(name) {
        name = name || this.name;
        if (name === undefined) return;
        var self = this;
        Weather.get({q: name, units: 'metric'}, function (weatherInfo) {
            if (weatherInfo.cod === 200) {
                self.populateByResponse(weatherInfo);
                self.status = self.statuses.waiting;
                if (self.onResolve instanceof Function) {
                    self.onResolve();
                }
            } else {
                self.error = true;
                if (self.onError instanceof Function) {
                    self.onError();
                }
            }
        });
    }

    City.prototype.update = function () {
        var self = this;
        console.log('update');
        self.status = self.statuses.updating;
        Weather.get({q: self.name, units: 'metric'}, function (weatherInfo) {
            self.populateByResponse(weatherInfo);
            self.status = self.statuses.waiting;
        });
    };

    City.prototype.populateByResponse = function (responce) {
        var self = this;
        self.name = responce.name;
        self.weather = {
            base: responce.weather[0],
            params: responce.main
        };
        self.autoUpdate = setTimeout(function () {
            self.update.call(self);
        }, 5000);
    };

    City.prototype.statuses = {
        waiting: 'waiting',
        updating: 'updating'
    };

    City.prototype.onResolve = function() {};
    City.prototype.onError = function() {};

    return City;
};