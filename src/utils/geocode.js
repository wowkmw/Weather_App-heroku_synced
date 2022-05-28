const got = require('got').default;

const promiseFunc = async address => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?` +
        `access_token=${process.env.geo_token}`;
    //the encodeURICompnent will encode special characters in a safe manner to prevent error
    try {
        let body = await got(url).json();
        if (body.features.length === 0) {
            throw 'No matching result, try using a different search term...';
        } else {
            return ({
                lat: body.features[0].center[1],
                lon: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    } catch (error) {
        console.log(error.message);
        throw 'No internet connection!';
    }
};

exports.promiseFunc = promiseFunc;