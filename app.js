#!/usr/bin/env node
const chalk = require("chalk");
const ora = require("ora");
const pck = require("./package.json");
const options = require("./utils/options");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const menu = require("./utils/menu");
const request = require("request");

////////////////////////
///////////////////////

const location = process.argv[2];
const units = options.getUnits(process.argv[3]);
const spinner = ora();

switch (location) {
  case undefined || "":
    menu();
    ////////////////
    geocode(address, (error, data) => {
      if (error) {
        return console.log(error);
      }
      const { latitude, longitude } = data;
      forecast(latitude, longitude, (error, forecastdata) => {
        if (error) {
          return console.log(error);
        }
        console.log(forecastdata);
      });
    });

    ////////////////
    //spinner.fail("Provide a location");
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
