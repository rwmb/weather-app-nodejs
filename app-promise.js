const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        address: {
            demand: true,
            alias: 'a',
            describe: 'The address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var geocodeKey = 'YOUR_GEOCODE_API_HERE';
var forecastKey = 'YOUR_FORECAST_API_HERE';
var addressURI = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${geocodeKey}&address=${addressURI}`;

axios.get(geocodeUrl)
    .then((response) => {
        if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find that address');
        }

        var location = {
            lat: response.data.results[0].geometry.location.lat,
            lng: response.data.results[0].geometry.location.lng
        };
        var weatherUrl = `https://api.darksky.net/forecast/${forecastKey}/${location.lat},${location.lng}`;

        console.log(response.data.results[0].formatted_address);
        return axios.get(weatherUrl);
    })
    .then((response) => {
        var temperature = response.data.currently.temperature;
        var apparentTemperature = response.data.currently.apparentTemperature;
        console.log(`It's currently ${temperature}, and it feels like ${apparentTemperature}`);
    })
    .catch((error) => {
        if (error.code === 'ENOTFOUND') {
            console.log('Unable to connect to api servers');
        } else {
            console.log(error.message);
        }
    });