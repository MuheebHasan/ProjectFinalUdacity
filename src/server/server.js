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

  // تحديث روابط API بمفاتيحك الفعلية
  const geonamesUrl = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=1e25db6198c048f6a47ba0ff1f6752a3`;
  const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=0003ae563de941a5856135010242712&q=${city}`;

  try {
    // Fetch data from OpenCage Geocoder
    const geonamesResponse = await fetch(geonamesUrl);
    const geonamesData = await geonamesResponse.json();

    // Fetch data from WeatherAPI
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    const responseData = {
      city: geonamesData.results[0]?.components.city || 'Unknown',
      country: geonamesData.results[0]?.components.country || 'Unknown',
      weather: weatherData.current?.condition.text || 'Unknown',
      temperature: weatherData.current?.temp_c || 'N/A',
    };

    res.send(responseData);
  } catch (error) {
    console.error('Error fetching data from APIs:', error);
    res.status(500).send({ error: 'Failed to fetch data from APIs' });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
