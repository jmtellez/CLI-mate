const request = require("postman-request");
const propertiesReader = require('properties-reader');
const ora = require("ora");

const props = propertiesReader("./application-properties.ini");

const forecast = (lat, lon, units, callback) => {
  const weatherstackURI = `http://api.weatherstack.com/current?access_key=${props.get('weatherstack.token')}&query=${lat},${lon}&units=${units}`;
  const spinner = ora("Preparing forecast").start();
  spinner.color = "yellow";

  setTimeout(() => {
    request({ url: weatherstackURI, json: true }, (err, { body } = {}) => {
      if (err) {
        spinner.stop();
        callback("Unable to connect to weatherstack services", undefined);
      } else if (body.error) {
        spinner.stop();
        callback("Unable to find location, try another search", undefined);
      } else {
        spinner.stop();
        callback(undefined, {
          temp: body.current.temperature,
          feelsLike: body.current.feelslike,
          description: body.current.weather_descriptions[0],
        });
      }
    });
  }, 1000);
};

module.exports = forecast;
