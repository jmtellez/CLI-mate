const request = require("postman-request");
const ora = require("ora");

// GEO CODE API CONST FROM MAP BOX
const GEO_CODE_API = "https://api.mapbox.com/geocoding/v5/mapbox.places/"

// Build the string containing the API request URL with the Address provided
const geocode = (address, callback) => {
  const geocodingURL = `${GEO_CODE_API}${encodeURIComponent(
    address
  )}.json?access_token=${process.env.MAPBOX}`;

  // Show on screen the text Getting Geocodes
  const spinner = ora("Getting geocodes").start();

  // Try to get the the Geo Code from the location provided
  setTimeout(() => {
    request({ url: geocodingURL, json: true }, (err, { body } = {}) => {
      if (err) {
        spinner.stop();
        callback("Unable to connect to mapbox services", undefined);
      } else if (body.features.length === 0) {
        spinner.stop();
        callback("Unable to find location, try another search", undefined);
      } else {
        spinner.stop();
        callback(undefined, {
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name,
        });
      }
    });
  }, 1000);
};

module.exports = geocode;
