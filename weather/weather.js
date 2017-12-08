var request = require('request');

var toCelcius = (F) => {
    let temp = (F - 32) * 5/9;
    return temp.toFixed(2);
};

var toFahrenheit = (C) => {
    let temp = (C * 9/5) + 32;
    return temp.toFixed(2);
};

var toKelvin = (C) => {
    let temp =  C + 273.15;
    return temp.toFixed(2);
};

var apiKey = 'YOUR_API_KEY_HERE';

var getWeather = (location, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${apiKey}/${location.lat},${location.lng}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(null, {
                temperature: toCelcius(body.currently.temperature),
                apparentTemperature: toCelcius(body.currently.apparentTemperature)
            });
        } else {
            callback('Unable to fetch weather');
        }
    });
};

module.exports.getWeather = getWeather;
module.exports.toCelcius = toCelcius;
module.exports.toFahrenheit = toFahrenheit;
module.exports.toKelvin = toKelvin;