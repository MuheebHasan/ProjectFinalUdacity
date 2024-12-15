const fetch = require('node-fetch');

const baseURL = 'http://api.geonames.org/searchJSON?q=';
const apiKey = 'your_geonames_api_key';

const performAction = async () => {
  const city = document.getElementById('city').value;

  if (!city) {
    alert('Please enter a city name!');
    return;
  }

  const url = `${baseURL}${city}&maxRows=1&username=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};

export { performAction };
