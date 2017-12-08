const request = require('request');

var apiKey = 'YOUR_API_KEY_HERE';

var geocodeAddress = (address) => {
    let promise = new Promise((resolve, reject) => {
        var addressURI = encodeURIComponent(address);
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&address=${addressURI}`,
            json: true
        }, (error, response, body) => {
            //console.log(JSON.stringify(body, null, 2));
            if (error) {
                reject('Unable to connect to Google servers.');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find the entered address');
            } else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    location: {
                        lat: body.results[0].geometry.location.lat,
                        lng: body.results[0].geometry.location.lng
                    }
                });
            } else {
                reject('An unexpected error ocurred, please try again');
            }
        });
    });
    return promise;
};

geocodeAddress('91720020')
    .then((location) => {
        console.log(JSON.stringify(location, null, 2));
    })
    .catch((error) => {
        console.log(error);
    });