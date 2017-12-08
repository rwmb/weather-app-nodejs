const request = require('request');

var apiKey = 'AIzaSyClfPAH-QPMda_6yDYCLXrbYVBgj2_uD6M';

module.exports.geocodeAddress = (address, callback) => {
    var addressURI = encodeURIComponent(address);
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&address=${addressURI}`,
        json: true
    }, (error, response, body) => {
        //console.log(JSON.stringify(body, null, 2));
        if (error) {
           callback('Unable to connect to Google servers.');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find the entered address');
        } else if (body.status === 'OK') {
            callback(null, {
                address: body.results[0].formatted_address,
                location: {
                    lat: body.results[0].geometry.location.lat,
                    lng: body.results[0].geometry.location.lng
                }
            });
        } else {
            callback('An unexpected error ocurred, please try again');
        }
    });
};