// const request = require('request');
// const forecast = (latitude, longitude, callback) => {
//   const url2 =
//     'http://api.weatherstack.com/current?access_key=370109905e5c3c5fcdbe3843cac3cc46&query=' +
//     latitude +
//     ',' +
//     longitude +
//     '&units=m';

//   request({ url: url2, json: true }, (error, response) => {
//     if (error) {
//       callback('Unable to connect to weather service!', undefined);
//     } else if (response.body.error) {
//       callback('Unable to find location', undefined);
//     } else {
//       callback(
//         undefined,

//         response.body.current.weather_descriptions[0] +
//           '. It is currently ' +
//           response.body.current.temperature +
//           ' degrees out. It feels like ' +
//           response.body.current.feelslike +
//           ' degrees out.'
//       );
//     }
//   });
// };

// module.exports = forecast;
//----------------------------
//Destructuring Challenge

const request = require('request');
const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=370109905e5c3c5fcdbe3843cac3cc46&query=' +
    latitude +
    ',' +
    longitude +
    '&units=m';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(
        undefined,

        body.current.weather_descriptions[0] +
          '. It is currently ' +
          body.current.temperature +
          ' degrees outside and it feels like ' +
          body.current.feelslike +
          ' degrees. There is ' +
          body.current.precip +
          '% chance of raining.'
      );
    }
  });
};

module.exports = forecast;
