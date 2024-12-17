const fetch = require('node-fetch');

const baseURLs = {
  geonames: 'http://api.geonames.org/searchJSON?q=',
  weatherbit: 'https://api.weatherbit.io/v2.0/current?city=',
  pixabay: 'https://pixabay.com/api/?key=',
};

const apiKeys = {
  geonames: 'YOUR_GEONAMES_API_KEY',
  weatherbit: 'YOUR_WEATHERBIT_API_KEY',
  pixabay: 'YOUR_PIXABAY_API_KEY',
};

// Placeholder object with default values
const projectData = {
  city: '',
  country: '',
  weather: '',
  imageURL: '',
};

// Primary function to fetch data
const performAction = async () => {
  const city = document.getElementById('city').value;

  if (!city) {
    alert('Please enter a city name!');
    return;
  }

  try {
    // 1. Geonames API: Get City & Country Info
    const geoRes = await fetch(`${baseURLs.geonames}${city}&maxRows=1&username=${apiKeys.geonames}`);
    const geoData = await geoRes.json();
    projectData.city = geoData.geonames[0].name;
    projectData.country = geoData.geonames[0].countryName;

    // 2. Weatherbit API: Get Weather Info
    const weatherRes = await fetch(`${baseURLs.weatherbit}${city}&key=${apiKeys.weatherbit}`);
    const weatherData = await weatherRes.json();
    projectData.weather = weatherData.data[0].weather.description;

    // 3. Pixabay API: Get City Image
    const pixabayRes = await fetch(`${baseURLs.pixabay}${apiKeys.pixabay}&q=${city}&image_type=photo`);
    const pixabayData = await pixabayRes.json();
    projectData.imageURL = pixabayData.hits[0].webformatURL;

    // Update the UI
    document.getElementById('results').innerHTML = `
      <p>City: ${projectData.city}</p>
      <p>Country: ${projectData.country}</p>
      <p>Weather: ${projectData.weather}</p>
      <img src="${projectData.imageURL}" alt="${city}">
    `;
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to fetch data. Please try again!');
  }
};

export { performAction };
