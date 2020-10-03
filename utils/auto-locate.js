const request = require("postman-request");
//get freegeoip

function autoLocate(callback) {
  request("https://freegeoip.app/json/", (err, body) => {
    if (err) console.log(err);
    const res = JSON.parse(body.body);
    console.log(undefined, res.city)
  });

}

//autoLocate()
module.exports = autoLocate