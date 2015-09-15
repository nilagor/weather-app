/**
 * Created by nilagor on 14.09.2015.
 * City model
 */
module.exports = function (Weather) {

    /**
     * Interval for auto refresh weather information (seconds)
     * @type {number}
     */
    var autoUpdateInterval = 5;

    function City(name) {
        var self = this;
        self.name = name || self.name;
        self.id = name + ((new Date).getTime() / 1000 | 0); // almost guid
        if (name === undefined) return;
        self.update().then(function () {
            if (self.onResolve instanceof Function) self.onResolve();
        });
    }

    /**
     * Updates weather information for itself
     * @returns {*|Function|promise|f}
     */
    City.prototype.update = function () {
        var self = this;
        self.status = self.statuses.updating;
        return Weather.get({q: self.name, units: 'metric'}, function (response) {
            self.checkResponse(response);
        }).$promise;
    };

    /**
     * Checks response of weather service after update
     * @param response
     */
    City.prototype.checkResponse = function (response) {
        if (response.cod !== 200) {
            this.error = true;
            if (this.onError instanceof Function) this.onError();
            return;
        }

        this.populateByResponse(response);
        this.status = this.statuses.waiting;
    };

    /**
     * Populate model by response from weather service
     * @param response
     */
    City.prototype.populateByResponse = function (response) {
        var self = this;
        self.name = response.name;
        self.weather = {
            base: response.weather[0],
            params: response.main
        };
        self.autoUpdate = setTimeout(function () {
            self.update.call(self);
        }, autoUpdateInterval * 1000);
    };

    /**
     * Stops the auto-update
     */
    City.prototype.stopUpdate = function () {
        clearTimeout(this.autoUpdate);
    };

    /**
     * List of possible statuses
     * @type {{waiting: string, updating: string}}
     */
    City.prototype.statuses = {
        waiting: 'waiting',
        updating: 'updating'
    };

    /**
     * Callback for first populating
     */
    City.prototype.onResolve = function () {
    };
    /**
     * Callback for error answer from weather service
     */
    City.prototype.onError = function () {
    };

    return City;
};