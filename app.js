#!/usr/bin/env node
const chalk = require("chalk");
const ora = require("ora");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const menu = require("./utils/menu");
const meow = require("meow");

const spinner = ora();

const cli = meow(menu, {
  flags: {
    units: { type: "string", alias: "u", default: "f" },
  },
});

const units = cli.flags.units;
const location = cli.input[0];

switch (location) {
  case undefined:
    menu();
    spinner.fail("Provide a location");
    break;
  case location:
    geocode(location, (err, { latitude, longitude, location } = {}) => {
      if (err) {
        return spinner.fail(err);
      }
      forecast(
        latitude,
        longitude,
        units,
        (err, { description, temp, feelsLike, tempScale } = {}) => {
          if (err) {
            return spinner.fail(err);
          }
          spinner.succeed(chalk.underline(location));
          console.log(
            chalk.cyanBright(
              `${description}. It is currently ${temp}${tempScale}, it feels like ${feelsLike}${tempScale}.`
            )
          );
        }
      );
    });
  default:
    break;
}
