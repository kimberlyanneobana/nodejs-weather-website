const request = require('request');

const geocode = (address, callback) => {
  const url =
    'http://api.positionstack.com/v1/forward?access_key=ced8799c7b6670f71a42e08af5241c33&query=' +
    encodeURIComponent(address) +
    '&output=json';
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (body.data === undefined) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      callback(undefined, {
        latitude: body.data[0].latitude,
        longitude: body.data[0].longitude,
        location: body.data[0].name,
      });
    }
  });
};
module.exports = geocode;
