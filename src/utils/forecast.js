const got = require('got').default;

const promiseFunc = async (lat, lon) => {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.weather_token}query=${lat},${lon}&units=m`;
    try {
        let body = await got(url).json();
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

exports.promiseFunc = promiseFunc;