const request = require("postman-request");
const ora = require("ora");

const autoLocate = (callback) => {
  const freeGeoIpURL = "https://freegeoip.app/json";
  const spinner = ora("Getting geolocation").start();
  setTimeout(() => {
    request({ url: freeGeoIpURL, json: true }, (err, { body } = {}) => {
      if(err){
        spinner.stop();
        callback("Unable to get geolocation", undefined);
      }else{
        spinner.stop();
        callback(undefined,{
          latitude: body.latitude,
          longitude:body.longitude,
          location: `${body.city}, ${body.region_name}, ${body.country_name}`
        });
      }
    });
  }, 1000);
};

module.exports = autoLocate;