#!/usr/bin/env node
const chalk = require("chalk");
const ora = require("ora");
const pck = require("./package.json");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const menu = require("./utils/menu");

const spinner = ora();
const args = process.argv;
let units;
let location;

if (args[2] === "-h" || args[2] === "--help") {
  menu();
  return;
}
if (args[2] === "-v" || args[2] === "--version") {
  spinner.succeed(pck.version);
  return;
}

for (let i = 2; i < args.length; i++) {
  if (args[i].startsWith("--u")) {
    parseunit = args[i].split("=")[1];
    if (['m', 's', 'f'].includes(parseunit)) {
      units = parseunit;
    }
  }
  else if (!location) {
    location = args[i];
  }
}

if (!location) {
  menu();
  return spinner.fail("Provide a location");
}

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