const https = require('https');
const api = require('./api.json');

// Print out temperature details
function printMessage(location, temp) {
    console.log(`The current temperature in ${location} is ${temp}.`);
}

// Print out error Messages
function printError(error) {
    console.error(error.message);
}

function get(query) {
    try {
        const request = https.get(`https://api.wunderground.com/api/${api.key}/conditions/q/${query}.json`, response => {
            if (response.statusCode === 200) {
                let body = "";

                response.on('data', chunk => {
                    body += chunk.toString();
                });

                response.on('end', () => {
                  try {
                    const weather = JSON.parse(body);
                    if (weather.current_observation) {
                      printMessage(weather.current_observation.display_location.full, weather.current_observation.temperature_string)
                    } else {
                      const queryError = new Error(`The location ${query} was not found`);
                      printError(queryError);
                    }
                  } catch (error) {
                    printError(error);
                  }
                });
            } else {
              const statusCodeError = new Error(`There was an error getting the message for (${query}. ${httpSTATUS_CODES[response.statusCode]})`);
              printError(statusCodeError);
            }
        });
    } catch (error) {
        printError(error);
    }
}

module.exports.get = get;
