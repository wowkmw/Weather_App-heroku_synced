(() => {
    const request = require('postman-request');

    const forecast = (lat, lon, callback) => {
        const url = `http://api.weatherstack.com/current?access_key=6bb668e0d2e0eeb6794a6494de4c35a5&query=${lat},${lon}&units=m`;
        request({
            url,
            json: true
        }, (error, {
            body //set default value = {} when destructuring
        } = {}) => {
            if (error) {
                callback('No internet connection!', undefined);
            } else if (body.error) {
                callback(body.error.info, undefined);
            } else {
                callback(undefined, {
                    description: body.current.weather_descriptions[0],
                    currentTemp: body.current.temperature,
                    feelslike: body.current.feelslike
                });
            }
        });
    };

    module.exports = forecast;
})();