import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Routes for API calls
app.post('/getData', async (req, res) => {
  const { city } = req.body;

  if (!city || typeof city !== 'string' || city.trim() === '') {
    return res.status(400).send({ error: 'Invalid city name. Please provide a valid city name.' });
  }

  const geonamesUrl = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=1e25db6198c048f6a47ba0ff1f6752a3`;
  const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=0003ae563de941a5856135010242712&q=${city}`;

  try {
    // Fetch data from OpenCage Geocoder
    const geonamesResponse = await fetch(geonamesUrl, { timeout: 5000 });
    if (!geonamesResponse.ok) {
      throw new Error(`Geonames API error: ${geonamesResponse.statusText}`);
    }
    const geonamesData = await geonamesResponse.json();

    if (!geonamesData.results || geonamesData.results.length === 0) {
      return res.status(404).send({ error: 'No data found for the entered city.' });
    }

    // Fetch data from WeatherAPI
    const weatherResponse = await fetch(weatherUrl, { timeout: 5000 });
    if (!weatherResponse.ok) {
      throw new Error(`WeatherAPI error: ${weatherResponse.statusText}`);
    }
    const weatherData = await weatherResponse.json();

    const responseData = {
      city: geonamesData.results[0]?.components.city || 'Unknown',
      country: geonamesData.results[0]?.components.country || 'Unknown',
      weather: weatherData.current?.condition.text || 'Unknown',
      temperature: weatherData.current?.temp_c || 'N/A',
    };

    res.send(responseData);
  } catch (error) {
    console.error('Error fetching data from APIs:', error.message);
    res.status(500).send({ error: `Server Error: ${error.message}` });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
