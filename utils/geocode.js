const request = require("postman-request");
const ora = require("ora");

const geocode = (address, callback) => {
  const geocodingURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYWJoaXNoZWtiaGF3YXJlIiwiYSI6ImNrYnF2dzBicjAxYjcycXF4emQzcG9lcm4ifQ.TCBvoJc65X2vVdgPz_lKag&limit=1`;
  const spinner = ora("Getting geocodes").start();
  setTimeout(() => {
    request({ url: geocodingURL, json: true }, (err, { body } = {}) => {
      //console.log("ashu " + body.features.length);
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
