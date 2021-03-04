// nodemon src/app.js -e js,hbs

//app.com
// app.get('', (req, res) => {
//   res.send('<h1>Weather</h1>');
// });

const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views'); //changed views folder to templates
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs'); //set up npm handlebars for dynamic templates
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Kim Obana',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About the Author',
    name: 'Kim Obana',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpMessage: 'This is some helpful text.',
    title: 'Help',
    name: 'Kim Obana',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!',
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Kim Obana',
    errorMessage: 'Help article not found',
  });
});
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Kim Obana',
    errorMessage: 'Page not found.',
  });
});

// for local
// app.listen(3000, () => {
//   console.log('Server is up on port 3000.');
// });

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
