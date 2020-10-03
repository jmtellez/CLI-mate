#!/usr/bin/env node
const chalk = require("chalk");
const ora = require("ora");
const pck = require("./package.json");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const menu = require("./utils/menu");

const location = process.argv[2];
// const units = process.argv[3];
const spinner = ora();

switch (location) {
  case undefined:
    menu();

/* 
== Autolocation - should be fired on case undefined

Const autoLocate = require("./utils/autolocate")


autoLocate((err, city) => {
 //console.log(city) ;

case geocode, etc.
})

==
*/
    spinner.fail("Provide a location");
    break;
  case "--help" || "--h":
  case "--h":
    menu();
    break;
  case "--version" || "--v":
  case "--v":
    spinner.succeed(pck.version);
    break;

  case location:
    geocode(location, (err, { latitude, longitude, location } = {}) => {
      if (err) {
        return spinner.fail(err);
      }
      forecast(
        latitude,
        longitude,
        (err, { description, temp, feelsLike } = {}) => {
          if (err) {
            return spinner.fail(err);
          }
          spinner.succeed(chalk.underline(location));
          // TODO check for units - °F default for now
          console.log(
            chalk.cyanBright(
              `${description}. It is currently ${temp}°F, it feels like ${feelsLike}°F.`
            )
          );
        }
      );
    });
  default:
    break;
}
