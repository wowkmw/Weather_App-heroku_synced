const got = require('got').default;
const weather_token = process.env.weather_token;

const promiseFunc = async (lat, lon) => {
    const url = `http://api.weatherstack.com/current?access_key=${weather_token}&query=${lat},${lon}&units=m`;
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
        throw error.message;
    }
};

exports.promiseFunc = promiseFunc;