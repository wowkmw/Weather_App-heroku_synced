(() => {
    const request = require('postman-request');

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

    const promiseFunc = (lat, lon) => {
        return new Promise((resolve, reject) => {
            const url = `http://api.weatherstack.com/current?access_key=6bb668e0d2` +
                `e0eeb6794a6494de4c35a5&query=${lat},${lon}&units=m`;
            request({
                url,
                json: true
            }, (error, {
                body //set default value = {} when destructuring
            } = {}) => {
                if (error) {
                    return reject('No internet connection!');
                } else if (body.error) {
                    return reject(body.error.info);
                } else {
                    resolve({
                        description: body.current.weather_descriptions[0],
                        currentTemp: body.current.temperature,
                        feelslike: body.current.feelslike,
                        uvindex: body.current.uv_index,
                        humidity: body.current.humidity,
                        wind: body.current.wind_speed
                    });
                }
            });
        });
    };

    exports.callbackFunc = callbackFunc;
    exports.promiseFunc = promiseFunc;
})();