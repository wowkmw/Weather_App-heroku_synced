(() => {
    const request = require('postman-request');

    const geoCode = (address, callback) => {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia213MDMwNjIiLCJhIjoiY2toMGh6YXVoMHZibTJ4azB0ajJ3NHNlcCJ9.kZQusSE9k4qX0hkztwLp4g';
        //the encodeURICompnent will encode special characters in a safe manner to prevent error
        request({
            url,
            json: true
        }, (error, {
            body //set default value = {} when destructuring
        } = {}) => {
            if (error) {
                callback('No internet connection!', undefined);
            } else if (body.features.length === 0) {
                callback('No matching result, try use a different search term...', undefined);
            } else {
                callback(undefined, {
                    lat: body.features[0].center[1],
                    lon: body.features[0].center[0],
                    location: body.features[0].place_name
                });
            }
        });
    };

    module.exports = geoCode;
})();