const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (error, results) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Address:', results.address);
        weather.getWeather(results.location, (error, weatherResults) => {
            console.log('Temperature:', weatherResults.temperature, 'ºC');
            console.log('Apparent Temperature:', weatherResults.apparentTemperature, 'ºC');
        });
    }
});