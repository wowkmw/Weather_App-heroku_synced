const forecast = require('./forecast');
const geocode = require('./geocode');

const weatherQueryAsync = async (res, query) => {
    if (!query) {
        res.status(400).send({
            error: "Please provide an address!"
        });
    } else if (query.length < 3) {
        res.status(400).send({
            error: "Search term too short!"
        });
    } else {
        try {
            let geoData = await geocode.promiseFunc(query);
            let weatherData = await forecast.promiseFunc(geoData.lat, geoData.lon);
            res.status(200).send({
                location: geoData.location,
                description: weatherData.description,
                currentTemp: weatherData.currentTemp,
                feelslike: weatherData.feelslike,
                uvindex: weatherData.uvindex,
                humidity: weatherData.humidity,
                wind: weatherData.wind
            });
        } catch (error) {
            return res.status(500).send({
                error
            });
        }
    }
};

exports.weatherQueryAsync = weatherQueryAsync;