const request = require("postman-request");
const ora = require("ora");

const forecast = (lat, lon, units = "f", callback) => {
  const weatherstackURI = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK}&query=${lat},${lon}&units=${units}`;
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
          tempScale: getTemperatureScale(body.request.unit),
          windSpeed: body.current.wind_speed,
          windDir: body.current.wind_dir,
          windScale: getSpeedScale(body.request.unit),
          precipitation: body.current.precip,
          precipitationUnits: getPrecipUnits(body.request.unit),
          humidity: body.current.humidity,
          cloudCover: body.current.cloudcover,
        });
      }
    });
  }, 1000);
};

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

const getSpeedScale = (apiUnit) => {
  switch (apiUnit) {
    case "s":
    case "m":
      return "km/h";
    case "f":
      return "mph";
    default:
      return "mph";
  }
};

const getPrecipUnits = (apiUnit) => {
  switch (apiUnit) {
    case "s":
    case "m":
      return "mm";
    case "f":
      return "in";
    default:
      return "in";
  }
}


module.exports = forecast;
