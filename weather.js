const https = require('https');
const api = require('./api.json');

// Print out temperature details
function printMessage(location, temp) {
  console.log(`The current temperature in ${location} is ${temp}.`);
}

// Print out error Messages



function get(query) {
  const request = https.get(`https://api.wunderground.com/api/${api.key}/conditions/q/${query}.json`, response => {
      let body = "";

      response.on('data', chunk => {
        body += chunk.toString();
      });

      response.on('end', () => {
        const profile = JSON.parse(body);
        printMessage(profile.current_observation.display_location.full, profile.current_observation.temperature_string)
      });
  });
}

module.exports.get = get;
