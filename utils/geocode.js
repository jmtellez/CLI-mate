const request = require("postman-request");
const ora = require("ora");

const geocode = (address, callback) => {
  const geocodingURL = `${process.env.GEOCODING_URL}${
    process.env.GEOCODING_PATH
  }${encodeURIComponent(address)}.json?access_token=${process.env.MAPBOX}`;

  const spinner = ora("Getting geocodes").start();

  setTimeout(() => {
    request({ url: geocodingURL, json: true }, (err, { body } = {}) => {
      if (err) {
        spinner.stop();
        callback("Unable to connect to mapbox services", undefined);
      } else if (body.message && !body.features) {
        spinner.stop();
        callback(body.message, undefined);
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
