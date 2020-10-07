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
autoLocate((err, city) => {
 console.log(city) ;
})
*/