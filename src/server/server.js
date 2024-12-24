const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const port = 8081;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));

// Routes for API calls
app.post('/geonames', async (req, res) => {
  const { city } = req.body;
  const geonamesUrl = `https://api.geonames.org/searchJSON?q=${city}&username=YOUR_GEONAMES_USERNAME`;

  try {
    const response = await fetch(geonamesUrl);
    const data = await response.json();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch data from Geonames' });
  }
});

app.post('/weather', async (req, res) => {
  const { city } = req.body;
  const weatherUrl = `https://api.weatherbit.io/v2.0/current?city=${city}&key=YOUR_WEATHERBIT_API_KEY`;

  try {
    const response = await fetch(weatherUrl);
    const data = await response.json();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch data from Weatherbit' });
  }
});

app.post('/pixabay', async (req, res) => {
  const { city } = req.body;
  const pixabayUrl = `https://pixabay.com/api/?key=YOUR_PIXABAY_API_KEY&q=${city}&image_type=photo`;

  try {
    const response = await fetch(pixabayUrl);
    const data = await response.json();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch data from Pixabay' });
  }
});

app.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
});
