#!/usr/bin/env node
const weather = require("./utils/weather");
const yargs = require("yargs");

const argv = yargs.command({
  command: "lookup",
  aliases: "lk",
  describe: "- Get weather temperature for a given location.",
  builder: {
    location: {
      describe: "City name",
      demandOption: true,
      type: "string",
    },
    units: {
      describe: "m - Metric / s - Scientific / f - Fahrenheit (default)",
      demandOption: false,
      type: "string",
    },
  },
  handler(argv) {
    weather(argv.location, argv.units);
  },
})
.strict().argv

if (!argv._[0]) {
  yargs.showHelp()
}