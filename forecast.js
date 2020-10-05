const request = require("postman-request");
const ora = require("ora");

const API_URL = "http://api.weatherstack.com";

const forecast = (lat, lon, units = "f", callback) => {
  const weatherstackURI = `${API_URL}/current?access_key=${process.env.WEATHERSTACK}&query=${lat},${lon}&units=${units}`;
  const spinner = ora("Preparing forecast").start();
  spinner.color = "yellow";

  // Do the request to the api with the location and the expected retorn its an json containing something like: temperature, feels like and description
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
          tempScale: getTemperatureScale(body.request.unit),
        });
      }
    });
  }, 1000);
};

// Get the temperature scale provided by the option
const getTemperatureScale = (apiUnit) => {
  switch (apiUnit) {
    case "s":
      return "°K";
    case "m":
      return "°C";
    case "f":
    default:
      return "°F";
  }
};

module.exports = forecast;
