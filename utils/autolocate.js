autoLocate = (callback) => {
  request("https://freegeoip.app/json/", (err, body) => {
    if (err) {
      callback(err, undefined)
    };
    const res = JSON.parse(body.body);
    callback(undefined, res.city)
  });

}

module.exports = autoLocate;

/*

usage: 
const autoLocate = require("./utils/autolocate.js")

autoLocate((err, city) => {
 console.log(city) 
//city returns the location
geocode(location, (err, ....
;
})
*/