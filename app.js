#!/usr/bin/env node
const chalk = require("chalk");
const ora = require("ora");
const pck = require("./package.json");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const menu = require("./utils/menu");

const getInputUnit = (argumentValue) => {
  if (argumentValue && (argumentValue.startsWith("--u=") || argumentValue.startsWith("--units="))) {
    return argumentValue.split("=")[1] || "f";
  }
  return "f";
};

const location = process.argv[2];
const unit = getInputUnit(process.argv[3]);
const spinner = ora();

switch (location) {
  case undefined:
    menu();
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
        unit,
        (err, { description, temp, feelsLike, tempScale } = {}) => {
          if (err) {
            return spinner.fail(err);
          }
          spinner.succeed(chalk.underline(location));
          // TODO check for units - °F default for now
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
