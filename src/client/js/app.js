export const performAction = async () => {
  const city = document.getElementById('city').value;
  if (!city) {
    alert('Please enter a city name!');
    return;
  }

  // Fetch data from APIs
  const geonamesUrl = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=1e25db6198c048f6a47ba0ff1f6752a3`;
  const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=0003ae563de941a5856135010242712&q=${city}`;

  try {
    // Fetch data from OpenCage Geocoder
    const geonamesResponse = await fetch(geonamesUrl);
    const geonamesData = await geonamesResponse.json();

    // Fetch data from WeatherAPI
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    const newEntry = {
      city: geonamesData.results[0]?.components.city || 'Unknown',
      country: geonamesData.results[0]?.components.country || 'Unknown',
      weather: weatherData.current?.condition.text || 'Unknown',
      temperature: weatherData.current?.temp_c || 'N/A', // Adding temperature as an example
    };

    // Post data to the server
    await fetch('/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntry),
    });

    alert('Data fetched and stored successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
};
