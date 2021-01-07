const request = require('request-promise-native');

const callbackFunc = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=6bb668e0d2` +
        `e0eeb6794a6494de4c35a5&query=${lat},${lon}&units=m`;
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
                feelslike: body.current.feelslike,
                uvindex: body.current.uv_index,
                humidity: body.current.humidity,
                wind: body.current.wind_speed
            });
        }
    });
};

const promiseFunc = async (lat, lon) => {
    const url = `http://api.weatherstack.com/current?access_key=6bb668e0d2` +
        `e0eeb6794a6494de4c35a5&query=${lat},${lon}&units=m`;
    try {
        let body = await request({
            url,
            json: true
        });
        if (body.error) {
            throw body.error.info;
        } else {
            return ({
                description: body.current.weather_descriptions[0],
                currentTemp: body.current.temperature,
                feelslike: body.current.feelslike,
                uvindex: body.current.uv_index,
                humidity: body.current.humidity,
                wind: body.current.wind_speed
            });
        }
    } catch (error) {
        console.log(error.message);
        throw 'No internet connection!';
    }
};

exports.callbackFunc = callbackFunc;
exports.promiseFunc = promiseFunc;