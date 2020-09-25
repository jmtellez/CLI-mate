const chalk = require("chalk");
const ora = require("ora");
const geocode = require("./geocode");
const forecast = require("./forecast");

const weather = (location, units = "f") => {
  const spinner = ora();

  if (!location) {
    return spinner.fail("Please provide a location");
  } else {
    geocode(location, (err, { latitude, longitude, location } = {}) => {
      if (err) {
        return spinner.fail(err);
      }
      forecast(
        latitude,
        longitude,
        units,
        (err, { description, temp, feelsLike } = {}) => {
          if (err) {
            return spinner.fail(err);
          }
          spinner.succeed(chalk.underline(location));
          switch (units) {
            case "m":
              console.log(
                chalk.cyanBright(
                  `${description}. It is currently ${temp}°C, it feels like ${feelsLike}°C`
                )
              );
              break;
            case "s":
              console.log(
                chalk.cyanBright(
                  `${description}. It is currently ${temp}°K, it feels like ${feelsLike}°K`
                )
              );
              break;
            default:
              console.log(
                chalk.cyanBright(
                  `${description}. It is currently ${temp}°F, it feels like ${feelsLike}°F`
                )
              );
          }
        }
      );
    });
  }
};

module.exports = weather;
